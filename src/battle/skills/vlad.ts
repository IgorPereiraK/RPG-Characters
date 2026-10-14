import { Dispatch, SetStateAction } from "react";
import { BattleDialogs } from "../dialogs/BattleDialogs";
import { FighterState, ReflexoMark, VersatilMode } from "../types";
import { armorDeVlad } from "../../components/data/armorBattleCharacters";
import { Item } from "../../components/types/Item";
import {
  advanceTrack,
  clampResource,
  rollHeal,
  spendMp,
} from "./shared";

type SetFighter = Dispatch<SetStateAction<FighterState>>;

export function freshReflexoMarks(): ReflexoMark[] {
  return [{ id: "1", name: "Inimigo 1", stacks: 0 }];
}

export function spendReflexo(
  state: FighterState,
  setState: SetFighter,
  maxMp: number,
  enemyId: string
) {
  const enemy = state.reflexoMarks.find((mark) => mark.id === enemyId);
  const name = enemy?.name.trim() || "Inimigo";
  const stacks = enemy?.stacks ?? 0;
  const lines = [
    `${name}: ${stacks} ${stacks === 1 ? "stack" : "stacks"} (${stacks}d6). Role 1d20+CONST para acertar. Gastou 6 de mana.`,
  ];
  if (state.versatil === "ataque") {
    lines.push(
      `Versátil adicionou ${rollD6()} de dano. Some esse valor ao dano causado.`
    );
  }
  if (state.angelical === "ataque") {
    lines.push(
      `Transformação Angelical adicionou ${rollD6()} de dano. Some esse valor ao dano causado.`
    );
  }
  spendMp(setState, 6, maxMp);
  return lines.join(" ");
}

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

const NEUTRAL_SOBREVIDA = 90;

function rollDie(sides: number) {
  return Math.floor(Math.random() * sides) + 1;
}

function wearingNeutral(state: FighterState) {
  return armorDeVlad[state.armorIndex]?.name === "Armadura Neutral";
}

type DefenseRoll = { name: string; sides: number };

function defenseRolls(state: FighterState): DefenseRoll[] {
  const rolls: DefenseRoll[] = [];
  if (state.versatil === "defesa") rolls.push({ name: "Versátil", sides: 6 });
  if (state.angelical === "defesa") rolls.push({ name: "Transformação Angelical", sides: 6 });
  if (state.neutralDefesa === 1) rolls.push({ name: "Armadura Neutral", sides: 10 });
  return rolls;
}

function applyHit(current: FighterState, amount: number, maxHp: number) {
  if (amount <= 0) {
    return {
      hp: clampResource(current.hp - amount, maxHp),
      sobrevida: current.sobrevida,
      soaked: 0,
      hpLoss: amount,
    };
  }

  const soaked = Math.min(current.sobrevida, amount);
  const hpLoss = amount - soaked;
  return {
    hp: clampResource(current.hp - hpLoss, maxHp),
    sobrevida: current.sobrevida - soaked,
    soaked,
    hpLoss,
  };
}

export function applyVladArmor(current: FighterState, index: number, armors: Item[]) {
  const wearing = armors[index]?.name === "Armadura Neutral";
  const wasWearing = armors[current.armorIndex]?.name === "Armadura Neutral";

  if (!wearing) {
    return {
      ...current,
      armorIndex: index,
      sobrevida: 0,
      neutralDefesa: 0,
      neutralBorder: "",
    };
  }

  return {
    ...current,
    armorIndex: index,
    sobrevida: wasWearing ? current.sobrevida : NEUTRAL_SOBREVIDA,
  };
}

export async function applyVladIncomingDamage(
  setState: SetFighter,
  maxHp: number,
  dialogs: BattleDialogs
) {
  let damage = 0;
  let rolls: DefenseRoll[] = [];

  setState((current) => {
    damage = current.damageInput;
    rolls = defenseRolls(current);
    if (rolls.length > 0 || damage <= 0) return current;
    const hit = applyHit(current, damage, maxHp);
    return { ...current, hp: hit.hp, sobrevida: hit.sobrevida };
  });

  if (rolls.length === 0 || damage <= 0) return;

  const rolled = rolls.map((item) => ({ ...item, roll: rollDie(item.sides) }));
  const reduction = rolled.reduce((sum, item) => sum + item.roll, 0);
  const taken = Math.max(0, damage - reduction);
  const detail = rolled.map((item) => `${item.name} reduziu ${item.roll}`).join(" e ");
  let soaked = 0;
  let hpLoss = taken;

  setState((current) => {
    const hit = applyHit(current, taken, maxHp);
    soaked = hit.soaked;
    hpLoss = hit.hpLoss;
    return { ...current, hp: hit.hp, sobrevida: hit.sobrevida };
  });

  const soakText = soaked > 0 ? ` A sobrevida absorveu ${soaked}.` : "";
  await dialogs.notify(
    taken === 0
      ? `${detail} e o golpe de ${damage} foi anulado.`
      : hpLoss <= 0
        ? `${detail} do golpe de ${damage}.${soakText}`
        : `${detail} do golpe de ${damage}. Vlad sofreu ${hpLoss} de dano.${soakText}`
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
  if (
    VLAD_ATTACKS.has(name) &&
    name !== "Transfusão Sanguínea" &&
    name !== "Reflexo Sanquíneo"
  ) {
    if (state.versatil === "ataque") {
      const bonus = rollD6();
      await dialogs.notify(
        `Versátil adicionou ${bonus} de dano a este golpe. Some esse valor ao dano causado.`
      );
    }
    if (state.angelical === "ataque") {
      const bonus = rollD6();
      await dialogs.notify(
        `Transformação Angelical adicionou ${bonus} de dano a este golpe. Some esse valor ao dano causado.`
      );
    }
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
      await applyFoco(state, setState, maxHp, dialogs);
      break;
    case "Armadura Neutral":
      await useNeutralArmor(state, setState, dialogs);
      break;
    case "Névoa":
      await spendNevoa(state, setState, dialogs);
      break;
    case "Transformação Angelical":
      await chooseAngelical(state, setState, dialogs);
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
      await applyVladTransfusao(state, setState, maxHp, maxMp, dialogs);
      break;
    case "Reflexo Sanquíneo":
      setState((current) => ({
        ...current,
        reflexoOpen: true,
        reflexoMarks:
          current.reflexoMarks.length > 0 ? current.reflexoMarks : freshReflexoMarks(),
      }));
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

async function spendNevoa(
  state: FighterState,
  setState: SetFighter,
  dialogs: BattleDialogs
) {
  if (state.nevoa <= 0) {
    await dialogs.notify("A transformação em névoa já foi usada hoje.");
    return;
  }

  setState((current) => ({
    ...current,
    nevoa: 0,
  }));
  await dialogs.notify("Vlad usou a transformação em névoa. Ela fica indisponível até o próximo dia.");
}

async function chooseAngelical(
  state: FighterState,
  setState: SetFighter,
  dialogs: BattleDialogs
) {
  const atual =
    state.angelical === "ataque"
      ? "A Transformação Angelical está em ataque."
      : state.angelical === "defesa"
        ? "A Transformação Angelical está em defesa."
        : "A Transformação Angelical está desativada.";
  const choice = await dialogs.choose(
    "Transformação Angelical",
    `${atual} Ataque soma 1d6 em cada golpe. Defesa reduz 1d6 de cada golpe recebido. A forma também concede +2 de ataque e +2 de CA.`,
    [
      { id: "ataque", label: "Ataque" },
      { id: "defesa", label: "Defesa" },
      { id: "off", label: "Desativar" },
    ]
  );

  if (choice !== "ataque" && choice !== "defesa" && choice !== "off") return;

  const wasOn = state.angelical !== "off";
  const willOn = choice !== "off";
  const delta = (willOn ? 2 : 0) - (wasOn ? 2 : 0);

  setState((current) => ({
    ...current,
    angelical: choice,
    angelicalBorder: versatilBorder(choice),
    ataque: current.ataque + delta,
    ca: current.ca + delta,
  }));

  if (choice === "off") {
    await dialogs.notify("Transformação Angelical desativada.");
    return;
  }

  await dialogs.notify(
    choice === "ataque"
      ? "Transformação Angelical ativada em ataque. Vlad ganha +2 de ataque, +2 de CA e 1d6 em cada golpe."
      : "Transformação Angelical ativada em defesa. Vlad ganha +2 de ataque, +2 de CA e reduz 1d6 de cada golpe recebido."
  );
}

async function applyVladTransfusao(
  state: FighterState,
  setState: SetFighter,
  maxHp: number,
  maxMp: number,
  dialogs: BattleDialogs
) {
  const choice = await dialogs.choose(
    "Transfusão Sanguínea",
    `Acertos nesta luta: ${state.transfusaoCount} de 3. No terceiro acerto, Vlad cura todo o dano causado. Um erro só gasta mana.`,
    [
      { id: "acertou", label: "Acertou" },
      { id: "errou", label: "Errou" },
    ]
  );

  if (choice !== "acertou" && choice !== "errou") return;

  if (choice === "errou") {
    spendMp(setState, 6, maxMp);
    await dialogs.notify("Vlad errou a Transfusão Sanguínea. Foram gastos 6 de mana, e o acerto não foi marcado.");
    return;
  }

  if (state.versatil === "ataque") {
    const bonus = rollD6();
    await dialogs.notify(
      `Versátil adicionou ${bonus} de dano a este golpe. Inclua esse valor no dano que você vai informar.`
    );
  }
  if (state.angelical === "ataque") {
    const bonus = rollD6();
    await dialogs.notify(
      `Transformação Angelical adicionou ${bonus} de dano a este golpe. Inclua esse valor no dano que você vai informar.`
    );
  }

  const damage = await dialogs.askNumber(
    "Quanto de dano Vlad causou com a habilidade Transfusão Sanguínea?"
  );

  if (damage === null) {
    await dialogs.notify("Operação cancelada.");
    return;
  }

  const fullHeal = state.transfusaoCount >= 2;
  const healed = fullHeal ? damage : Math.ceil(damage / 2);
  const nextCount = fullHeal ? 0 : state.transfusaoCount + 1;

  setState((current) => ({
    ...current,
    mp: clampResource(current.mp - 6, maxMp),
    hp: clampResource(current.hp + healed, maxHp),
    transfusaoCount: nextCount,
  }));

  await dialogs.notify(
    fullHeal
      ? `Esse foi o terceiro acerto. Vlad curou todo o dano causado: ${healed} de vida. A contagem voltou a 0.`
      : `Acerto ${nextCount} de 3. Vlad curou ${healed} de vida, metade do dano.`
  );
}

async function useNeutralArmor(
  state: FighterState,
  setState: SetFighter,
  dialogs: BattleDialogs
) {
  if (!wearingNeutral(state)) {
    await dialogs.notify("Equipe a Armadura Neutral para anular um crítico ou ativar a defesa de 1d10.");
    return;
  }

  const critText =
    state.neutralCrit > 0
      ? "O bloqueio de crítico ainda está disponível nesta luta."
      : "O bloqueio de crítico já foi usado nesta luta.";
  const defenseText =
    state.neutralDefesa === 1
      ? "A defesa de 1d10 está ativa."
      : "A defesa de 1d10 está desativada.";
  const options = [
    ...(state.neutralCrit > 0 ? [{ id: "critico", label: "Anular crítico" }] : []),
    {
      id: "defesa",
      label: state.neutralDefesa === 1 ? "Desativar defesa" : "Defesa 1d10",
    },
  ];

  const choice = await dialogs.choose(
    "Armadura Neutral",
    `${critText} ${defenseText}`,
    options
  );

  if (choice === "critico") {
    setState((current) => ({ ...current, neutralCrit: 0 }));
    await dialogs.notify("Vlad anulou um crítico. Esse bloqueio só volta na próxima luta.");
    return;
  }

  if (choice !== "defesa") return;

  const turningOn = state.neutralDefesa !== 1;
  setState((current) => ({
    ...current,
    neutralDefesa: turningOn ? 1 : 0,
    neutralBorder: turningOn ? "#9aa3ad" : "",
  }));
  await dialogs.notify(
    turningOn
      ? "Defesa da Armadura Neutral ativa. Cada golpe que Vlad sofrer é reduzido em 1d10."
      : "Defesa da Armadura Neutral desativada."
  );
}

async function applyFoco(
  state: FighterState,
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
  const extras = defenseRolls(state).map((item) => ({ ...item, roll: rollDie(item.sides) }));
  const extraTotal = extras.reduce((sum, item) => sum + item.roll, 0);
  const result = numeroDamage - foco - extraTotal;
  let soaked = 0;
  let hpLoss = result;

  setState((current) => {
    const hit = applyHit(current, result, maxHp);
    soaked = hit.soaked;
    hpLoss = hit.hpLoss;
    return { ...current, hp: hit.hp, sobrevida: hit.sobrevida };
  });

  const extraText =
    extras.length > 0
      ? ` e ${extras.map((item) => `${item.name} reduziu ${item.roll}`).join(" e ")}`
      : "";
  const soakText =
    soaked > 0
      ? ` A sobrevida absorveu ${soaked}${hpLoss > 0 ? ` e a vida perdeu ${hpLoss}` : ""}.`
      : "";

  await dialogs.notify(
    `O dano que Vlad levou foi ${numeroDamage}. Foco de Força reduziu ${foco}${extraText}. O dano final foi ${result}.${soakText}`
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
  const turningOff = state.transformOn === 1;
  const mod = turningOff ? -1 : 1;
  setState((current) => ({
    ...current,
    transformOn: turningOff ? 0 : 1,
    transformBonus: turningOff ? 0 : 1,
    transformBorder: turningOff ? "" : "red",
    forcaMod: current.forcaMod + mod,
    destrezaMod: current.destrezaMod + mod,
    constituicaoMod: current.constituicaoMod + mod,
    inteligenciaMod: current.inteligenciaMod + mod,
    carismaMod: current.carismaMod + mod,
    sabedoriaMod: current.sabedoriaMod + mod,
    ca: current.ca + mod * 2,
    ataque: current.ataque + mod,
  }));
}
