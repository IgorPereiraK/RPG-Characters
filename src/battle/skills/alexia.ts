import { Dispatch, SetStateAction } from "react";
import { BattleDialogs } from "../dialogs/BattleDialogs";
import { FighterState } from "../types";
import {
  advanceTrack,
  applyResistedDamage,
  spendCarga,
  spendMp,
} from "./shared";

type SetFighter = Dispatch<SetStateAction<FighterState>>;

export async function applyAlexiaSkill(
  name: string,
  state: FighterState,
  setState: SetFighter,
  maxHp: number,
  maxMp: number,
  dialogs: BattleDialogs
) {
  switch (name) {
    case "Tiro Perfurante": {
      const next = advanceTrack(
        state.passiva,
        2,
        3,
        "Passiva da Alexia pronta!",
        "blue"
      );
      if (next.alerted) await dialogs.notify(next.alerted);
      setState((current) => ({
        ...current,
        passiva: next.value,
        passivaBorder: next.border,
      }));
      break;
    }
    case "Armadura Hightec":
      toggleHightec(state, setState);
      break;
    case "Olhar da Coruja":
      spendMp(setState, 4, maxMp);
      break;
    case "Drone Auxiliar":
      spendCarga(setState, 1);
      break;
    case "Trincamento sobre Existente":
      spendMp(setState, 6, maxMp);
      break;
    case "Corvos Fabulosos":
      spendMp(setState, 5, maxMp);
      break;
    case "Repulsão Elétrica":
      spendCarga(setState, 2);
      break;
    case "Adagas Elétrica":
      spendCarga(setState, 3);
      break;
    case "Marca de Sangue":
      spendMp(setState, 4, maxMp);
      break;
    case "Defesa Hightec":
      await applyResistedDamage(
        setState,
        maxHp,
        "Quanto de dano você levou?",
        (numeroDamage, resistance, result) =>
          `O dano que Alexia levou foi ${numeroDamage}, mas a resistencia da armadura hightec de Alexia reduziu ${resistance} de dano que ela tomou, sendo assim o dano que Alexia levou foi reduzido para ${result}.`,
        dialogs
      );
      break;
    case "Anjo Vampírico":
    case "Míssil Tecnoarcano": {
      const next = advanceTrack(
        state.ult,
        4,
        5,
        "Ultimente do Alexia carregada!",
        "blue"
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

function toggleHightec(state: FighterState, setState: SetFighter) {
  const delta = state.hightecOn === 1 ? -2 : 2;
  setState((current) => ({
    ...current,
    hightecOn: state.hightecOn === 1 ? 0 : 1,
    hightecBorder: state.hightecOn === 1 ? "" : "red",
    forcaMod: current.forcaMod + delta,
    destrezaMod: current.destrezaMod + delta,
    inteligenciaMod: current.inteligenciaMod + delta,
    constituicaoMod: current.constituicaoMod + delta,
    sabedoriaMod: current.sabedoriaMod + delta,
    ca: current.ca + delta,
    ataque: current.ataque + delta,
  }));
}
