import { clampResource } from "./skills/shared";
import { FighterId, FighterState, VersatilMode } from "./types";

const SAVE_KEY = "rpg-battle-save";
const SAVE_VERSION = 2;

export type BattleSnapshot = {
  round: number;
  activeId: FighterId;
  vlad: FighterState;
  alexia: FighterState;
  riven: FighterState;
};

export type FighterLimits = {
  maxHp: number;
  maxMp: number;
  weapons: number;
  armors: number;
  skills: string[];
};

export type SaveLimits = Record<FighterId, FighterLimits>;

const NUMBER_FIELDS = [
  "ca",
  "ataque",
  "forcaMod",
  "destrezaMod",
  "constituicaoMod",
  "inteligenciaMod",
  "carismaMod",
  "sabedoriaMod",
  "damageInput",
  "healInput",
  "manaInput",
  "passiva",
  "ult",
  "bloodArmorOn",
  "bloodShieldOn",
  "transformOn",
  "hightecOn",
  "antiAtirador",
  "transfusaoCount",
] as const;

const TEXT_FIELDS = [
  "passivaBorder",
  "ultBorder",
  "bloodArmorBorder",
  "bloodShieldBorder",
  "transformBorder",
  "hightecBorder",
  "versatilBorder",
] as const;

const VERSATIL_MODES: VersatilMode[] = ["off", "ataque", "defesa"];

export function readBattleSnapshot(
  fallback: BattleSnapshot,
  limits: SaveLimits
): BattleSnapshot {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.version !== SAVE_VERSION) return fallback;
    if (!isRecord(parsed.fighters)) return fallback;

    return {
      round: pickRound(parsed.round, fallback.round),
      activeId: pickId(parsed.activeId, fallback.activeId),
      vlad: migrateVlad(restoreFighter(parsed.fighters.Vlad, fallback.vlad, limits.Vlad)),
      alexia: restoreFighter(parsed.fighters.Alexia, fallback.alexia, limits.Alexia),
      riven: restoreFighter(parsed.fighters.Riven, fallback.riven, limits.Riven),
    };
  } catch {
    return fallback;
  }
}

export function writeBattleSnapshot(snapshot: BattleSnapshot) {
  const payload = {
    version: SAVE_VERSION,
    round: snapshot.round,
    activeId: snapshot.activeId,
    fighters: {
      Vlad: snapshot.vlad,
      Alexia: snapshot.alexia,
      Riven: snapshot.riven,
    },
  };

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  } catch {
    /* a luta segue nesta visita */
  }
}

function migrateVlad(fighter: FighterState): FighterState {
  const next = { ...fighter };
  const plain = next.transformOn === 0 && next.bloodArmorOn === 0 && next.bloodShieldOn === 0;
  if (plain && next.constituicaoMod === 5) next.constituicaoMod = 7;
  if (plain && next.ataque === 5) next.ataque = 7;
  if (plain && next.ca === 17) next.ca = 19;
  if (next.hp === 234) next.hp = 324;
  if (next.mp === 82) next.mp = 116;
  return next;
}

function restoreFighter(
  saved: unknown,
  fallback: FighterState,
  limits: FighterLimits
): FighterState {
  if (!isRecord(saved)) return fallback;

  const next: FighterState = { ...fallback };

  for (const field of NUMBER_FIELDS) {
    next[field] = pickNumber(saved[field], fallback[field]);
  }

  for (const field of TEXT_FIELDS) {
    next[field] = pickText(saved[field], fallback[field]);
  }

  next.hp = clampResource(pickNumber(saved.hp, fallback.hp), limits.maxHp);
  next.mp = clampResource(pickNumber(saved.mp, fallback.mp), limits.maxMp);
  next.carga = pickOptionalNumber(saved.carga, fallback.carga);
  next.weaponIndex = pickIndex(saved.weaponIndex, limits.weapons, fallback.weaponIndex);
  next.armorIndex = pickIndex(saved.armorIndex, limits.armors, fallback.armorIndex);
  next.versatil = VERSATIL_MODES.includes(saved.versatil as VersatilMode)
    ? (saved.versatil as VersatilMode)
    : fallback.versatil;
  next.selectedSkill =
    typeof saved.selectedSkill === "string" && limits.skills.includes(saved.selectedSkill)
      ? saved.selectedSkill
      : fallback.selectedSkill;

  return next;
}

function pickRound(value: unknown, fallback: number) {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) return fallback;
  return value;
}

function pickId(value: unknown, fallback: FighterId): FighterId {
  if (value === "Vlad" || value === "Alexia" || value === "Riven") return value;
  return fallback;
}

function pickNumber(value: unknown, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return value;
}

function pickOptionalNumber(value: unknown, fallback: number | undefined) {
  if (value === undefined) return fallback;
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return value;
}

function pickText(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function pickIndex(value: unknown, length: number, fallback: number) {
  if (typeof value !== "number" || !Number.isInteger(value)) return fallback;
  if (value < 0 || value >= length) return fallback;
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
