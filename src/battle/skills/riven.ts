import { Dispatch, SetStateAction } from "react";
import { BattleDialogs } from "../dialogs/BattleDialogs";
import { FighterState } from "../types";
import {
  advanceTrack,
  applyResistedDamage,
  applyTransfusao,
  rollHeal,
  spendMp,
} from "./shared";

type SetFighter = Dispatch<SetStateAction<FighterState>>;

export async function applyRivenSkill(
  name: string,
  state: FighterState,
  setState: SetFighter,
  maxHp: number,
  maxMp: number,
  dialogs: BattleDialogs
) {
  switch (name) {
    case "Fotossíntese":
      await rollHeal(
        setState,
        maxHp,
        2,
        (heal) =>
          `A cura gerada de 1d2 por causa da habilidade Fotossíntese foi: ${heal} de vida`,
        dialogs
      );
      break;
    case "Onipresença": {
      const next = advanceTrack(
        state.passiva,
        2,
        3,
        "Passiva da Riven pronta!",
        "green"
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
      await applyResistedDamage(
        setState,
        maxHp,
        "Quanto de dano mágico você levou?",
        (numeroDamage, resistance, result) =>
          `O dano que Riven levou foi ${numeroDamage}, mas a resistencia de Riven reduziu ${resistance} de dano que ela tomou, sendo assim o dano que Riven levou foi reduzido para ${result}.`,
        dialogs
      );
      break;
    case "Blood Armor R":
      if (state.bloodArmorOn === 1) {
        setState((current) => ({
          ...current,
          ca: current.ca - 2,
          bloodArmorOn: 0,
          bloodArmorBorder: "",
        }));
      } else {
        setState((current) => ({
          ...current,
          ca: current.ca + 2,
          bloodArmorOn: 1,
          bloodArmorBorder: "green",
        }));
      }
      break;
    case "Transfusão Sanguínea":
      await applyTransfusao(
        state,
        setState,
        maxHp,
        maxMp,
        "Quanto de dano Riven causou com a habilidade Transfusão Sanguínea?",
        (healed) =>
          `Essa foi a terceira vez que Riven acertou a Transfusão Sanguínea, então Riven curou ${healed} de vida`,
        (healed) => `Riven curou ${healed} de vida`,
        dialogs
      );
      break;
    case "Agulhas de Sangue":
      spendMp(setState, 8, maxMp);
      break;
    case "Músculo Tonificar ou Ampliar":
      spendMp(setState, 4, maxMp);
      break;
    case "Erupção Plasmática":
      spendMp(setState, 7, maxMp);
      break;
    case "Trovão de Contração":
      spendMp(setState, 6, maxMp);
      break;
    case "Confusão":
      spendMp(setState, 5, maxMp);
      break;
    case "Psy Bean":
      spendMp(setState, 5, maxMp);
      break;
    case "Marca de Sangue":
      spendMp(setState, 4, maxMp);
      break;
    case "Cães Infernais R":
    case "Demon Back": {
      const next = advanceTrack(
        state.ult,
        4,
        5,
        "Ultimente do Riven carregada!",
        "green"
      );
      if (next.alerted) await dialogs.notify(next.alerted);
      setState((current) => ({
        ...current,
        ult: next.value,
        ultBorder: next.border,
      }));
      break;
    }
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
    default:
      console.log("Habilidade não encontrada!");
  }
}

export function spendRivenAntiAtirador(setState: SetFighter) {
  setState((current) => ({
    ...current,
    antiAtirador: current.antiAtirador - 1,
  }));
}
