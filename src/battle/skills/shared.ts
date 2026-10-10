import { Dispatch, SetStateAction } from "react";
import { BattleDialogs } from "../dialogs/BattleDialogs";
import { FighterState } from "../types";

export function clampResource(value: number, max: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(value, max));
}

export function advanceTrack(
  current: number,
  readyAt: number,
  readyValue: number,
  readyMessage: string,
  readyBorder: string
) {
  if (current === readyAt) {
    return { value: readyValue, border: readyBorder, alerted: readyMessage };
  }
  if (current < readyAt) {
    return { value: current + 1, border: "", alerted: undefined };
  }
  if (current === readyValue) {
    return { value: 0, border: "", alerted: undefined };
  }
  return { value: current, border: "", alerted: undefined };
}

export function spendMp(
  setState: Dispatch<SetStateAction<FighterState>>,
  amount: number,
  maxMp: number
) {
  setState((current) => ({
    ...current,
    mp: clampResource(current.mp - amount, maxMp),
  }));
}

export function spendCarga(
  setState: Dispatch<SetStateAction<FighterState>>,
  amount: number
) {
  setState((current) => ({
    ...current,
    carga: (current.carga ?? 0) - amount,
  }));
}

export async function rollHeal(
  setState: Dispatch<SetStateAction<FighterState>>,
  maxHp: number,
  sides: number,
  message: (heal: number) => string,
  dialogs: BattleDialogs
) {
  const heal = Math.floor(Math.random() * sides) + 1;
  setState((current) => ({
    ...current,
    hp: clampResource(current.hp + heal, maxHp),
  }));
  await dialogs.notify(message(heal));
}

export async function applyResistedDamage(
  setState: Dispatch<SetStateAction<FighterState>>,
  maxHp: number,
  promptText: string,
  resultText: (damage: number, resistance: number, result: number) => string,
  dialogs: BattleDialogs
) {
  const numeroDamage = await dialogs.askNumber(promptText);

  if (numeroDamage === null) {
    await dialogs.notify("Operação cancelada.");
    return;
  }

  const resistance = Math.floor(Math.random() * 6) + 1;
  const result = numeroDamage - resistance;

  setState((current) => ({
    ...current,
    hp: clampResource(current.hp - result, maxHp),
  }));

  await dialogs.notify(resultText(numeroDamage, resistance, result));
}

export async function applyTransfusao(
  state: FighterState,
  setState: Dispatch<SetStateAction<FighterState>>,
  maxHp: number,
  maxMp: number,
  promptText: string,
  thirdMessage: (healed: number) => string,
  halfMessage: (healed: number) => string,
  dialogs: BattleDialogs
) {
  setState((current) => ({
    ...current,
    mp: clampResource(current.mp - 6, maxMp),
    transfusaoCount:
      state.transfusaoCount + 1 === 3 ? 0 : state.transfusaoCount + 1,
  }));

  const damage = await dialogs.askNumber(promptText);

  if (damage === null) {
    await dialogs.notify("Por favor, insira um número válido.");
    return;
  }

  const fullHeal = state.transfusaoCount >= 2;
  const healedAmount = fullHeal ? damage : Math.ceil(damage / 2);

  setState((current) => ({
    ...current,
    hp: clampResource(current.hp + healedAmount, maxHp),
  }));

  await dialogs.notify(fullHeal ? thirdMessage(healedAmount) : halfMessage(healedAmount));
}
