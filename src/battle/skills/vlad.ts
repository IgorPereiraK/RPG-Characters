import { Dispatch, SetStateAction } from "react";
import { BattleDialogs } from "../dialogs/BattleDialogs";
import { FighterState, VersatilMode } from "../types";
import {
  advanceTrack,
  applyResistedDamage,
  applyTransfusao,
  clampResource,
  rollHeal,
  spendMp,
} from "./shared";

type SetFighter = Dispatch<SetStateAction<FighterState>>;

const VLAD_ATTACKS = new Set([
  "Garras Vampírica",
  "Mordida Vampírica",
  "Marca de Sangue",
  "Transfusão Sanguínea",
  "Reflexo Sanquíneo",
  "Agulhas de Sangue",
  "Pinguins Imperiais",
  "Cães Infernais",
]);

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function versatilBorder(mode: VersatilMode) {
  if (mode === "ataque") return "#e0b15a";
  if (mode === "defesa") return "#7eb6ff";
  return "";
}

function versatilPrompt(mode: VersatilMode) {
  if (mode === "ataque") {
    return "Versátil está em ataque: cada golpe ganha 1d6. Escolha de novo para trocar ou desativar.";
  }
  if (mode === "defesa") {
    return "Versátil está em defesa: cada golpe recebido perde 1d6. Escolha de novo para trocar ou desativar.";
  }
  return "Versátil está desativado. Ataque soma 1d6 em cada golpe. Defesa reduz 1d6 de cada golpe recebido.";
}

async function chooseVersatil(
  state: FighterState,
  setState: SetFighter,
  dialogs: BattleDialogs
) {
  const choice = await dialogs.choose("Versátil", versatilPrompt(state.versatil), [
    { id: "ataque", label: "Ataque" },
    { id: "defesa", label: "Defesa" },
    { id: "off", label: "Desativar" },
  ]);

  if (choice !== "ataque" && choice !== "defesa" && choice !== "off") return;

  setState((current) => ({
    ...current,
    versatil: choice,
    versatilBorder: versatilBorder(choice),
  }));

  if (choice === "ataque") {
    await dialogs.notify(
      "Versátil ativado em ataque. Cada golpe que Vlad causar ganha 1d6 de dano."
    );
  } else if (choice === "defesa") {
    await dialogs.notify(
      "Versátil ativado em defesa. Cada golpe que Vlad sofrer é reduzido em 1d6."
    );
  } else {
    await dialogs.notify("Versátil desativado.");
  }
}

export async function applyVladIncomingDamage(
  setState: SetFighter,
  maxHp: number,
  dialogs: BattleDialogs
) {
  let damage = 0;
  let defending = false;

  setState((current) => {
    damage = current.damageInput;
    defending = current.versatil === "defesa";
    if (!defending || damage <= 0) {
      return {
        ...current,
        hp: clampResource(current.hp - damage, maxHp),
      };
    }
    return current;
  });

  if (!defending || damage <= 0) return;

  const reduction = rollD6();
  const taken = Math.max(0, damage - reduction);

  setState((current) => ({
    ...current,
    hp: clampResource(current.hp - taken, maxHp),
  }));

  await dialogs.notify(
    taken === 0
      ? `Versátil reduziu ${reduction} e anulou o golpe de ${damage}.`
      : `Versátil reduziu ${reduction} do golpe de ${damage}. Vlad sofreu ${taken} de dano.`
  );
}

export async function applyVladSkill(
  name: string,
  state: FighterState,
  setState: SetFighter,
  maxHp: number,
  maxMp: number,
  dialogs: BattleDialogs
) {
  if (state.versatil === "ataque" && VLAD_ATTACKS.has(name)) {
    const bonus = rollD6();
    await dialogs.notify(
      `Versátil adicionou ${bonus} de dano a este golpe. Some esse valor ao dano causado.`
    );
  }

  switch (name) {
    case "Sangue de Ferro": {
      const next = advanceTrack(
        state.passiva,
        2,
        3,
        "Passiva do Vlad pronta!",
        "red"
      );
      if (next.alerted) await dialogs.notify(next.alerted);
      setState((current) => ({
        ...current,
        passiva: next.value,
        passivaBorder: next.border,
      }));
      break;
    }
    case "Foco de Força":
      if (state.versatil === "defesa") {
        await applyFocoWithVersatil(setState, maxHp, dialogs);
      } else {
        await applyResistedDamage(
          setState,
          maxHp,
          "Quanto de dano físico você levou?",
          (numeroDamage, resistance, result) =>
            `O dano que Vlad levou foi ${numeroDamage}, mas a resistencia de Vlad reduziu ${resistance} de dano que ele tomou, sendo assim o dano que Vlad levou foi reduzido para ${result}.`,
          dialogs
        );
      }
      break;
    case "Versátil":
      await chooseVersatil(state, setState, dialogs);
      break;
    case "Regeneração":
      await rollHeal(
        setState,
        maxHp,
        4,
        (heal) =>
          `A cura gerada de 1d4 pela habilidade Regeneração foi: ${heal} de vida`,
        dialogs
      );
      break;
    case "Gladiador Imortal":
      await rollHeal(
        setState,
        maxHp,
        6,
        (heal) =>
          `A cura gerada de 1d6 pela habilidade Gladiador Imortal foi: ${heal} de vida`,
        dialogs
      );
      break;
    case "Blood Armor":
      toggleCa(state.bloodArmorOn, setState, "bloodArmorOn", "bloodArmorBorder", "red");
      break;
    case "Blood Shield":
      toggleCa(
        state.bloodShieldOn,
        setState,
        "bloodShieldOn",
        "bloodShieldBorder",
        "red"
      );
      break;
    case "Transfusão Sanguínea":
      await applyTransfusao(
        state,
        setState,
        maxHp,
        maxMp,
        "Quanto de dano Vlad causou com a habilidade Transfusão Sanguínea?",
        (healed) =>
          `Essa foi a terceira vez que Vlad acertou a Transfusão Sanguínea, então Vlad curou ${healed} de vida`,
        (healed) => `Vlad curou ${healed} de vida`,
        dialogs
      );
      break;
    case "Reflexo Sanquíneo":
      spendMp(setState, 6, maxMp);
      break;
    case "Agulhas de Sangue":
      spendMp(setState, 8, maxMp);
      break;
    case "Pinguins Imperiais":
      spendMp(setState, 6, maxMp);
      break;
    case "Marca de Sangue":
      spendMp(setState, 4, maxMp);
      break;
    case "Transformação Vampírica":
    case "Garras Vampírica":
    case "Mordida Vampírica":
      toggleTransform(state, setState);
      break;
    case "Cães Infernais": {
      const next = advanceTrack(
        state.ult,
        4,
        5,
        "Ultimente do Vlad carregada!",
        "red"
      );
      if (next.alerted) await dialogs.notify(next.alerted);
      setState((current) => ({
        ...current,
        ult: next.value,
        ultBorder: next.border,
      }));
      break;
    }
    default:
      console.log("Habilidade não encontrada!");
  }
}

export function spendVladAntiAtirador(
  state: FighterState,
  setState: SetFighter
) {
  if (state.antiAtirador > 0) {
    setState((current) => ({
      ...current,
      antiAtirador: current.antiAtirador - 1,
    }));
  }
}

async function applyFocoWithVersatil(
  setState: SetFighter,
  maxHp: number,
  dialogs: BattleDialogs
) {
  const numeroDamage = await dialogs.askNumber("Quanto de dano físico você levou?");

  if (numeroDamage === null) {
    await dialogs.notify("Operação cancelada.");
    return;
  }

  const foco = rollD6();
  const versatil = rollD6();
  const result = numeroDamage - foco - versatil;

  setState((current) => ({
    ...current,
    hp: clampResource(current.hp - result, maxHp),
  }));

  await dialogs.notify(
    `O dano que Vlad levou foi ${numeroDamage}. Foco de Força reduziu ${foco} e Versátil reduziu ${versatil}. O dano final foi ${result}.`
  );
}

function toggleCa(
  on: number,
  setState: SetFighter,
  onKey: "bloodArmorOn" | "bloodShieldOn",
  borderKey: "bloodArmorBorder" | "bloodShieldBorder",
  border: string
) {
  if (on === 1) {
    setState((current) => ({
      ...current,
      ca: current.ca - 2,
      [onKey]: 0,
      [borderKey]: "",
    }));
    return;
  }

  setState((current) => ({
    ...current,
    ca: current.ca + 2,
    [onKey]: 1,
    [borderKey]: border,
  }));
}

function toggleTransform(state: FighterState, setState: SetFighter) {
  const delta = state.transformOn === 1 ? -4 : 4;
  setState((current) => ({
    ...current,
    transformOn: state.transformOn === 1 ? 0 : 1,
    transformBorder: state.transformOn === 1 ? "" : "red",
    forcaMod: current.forcaMod + delta,
    destrezaMod: current.destrezaMod + delta,
    inteligenciaMod: current.inteligenciaMod + delta,
    constituicaoMod: current.constituicaoMod + delta,
    ca: current.ca + delta,
    ataque: current.ataque + delta,
  }));
}
