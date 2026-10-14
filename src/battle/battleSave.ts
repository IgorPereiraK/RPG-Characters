import { armorDeVlad } from "../components/data/armorBattleCharacters";
import { clampResource } from "./skills/shared";
import { FighterId, FighterState, ReflexoMark, VersatilMode } from "./types";

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
  "transformBonus",
  "sobrevida",
  "neutralCrit",
  "neutralDefesa",
  "hightecOn",
  "antiAtirador",
  "transfusaoCount",
  "nevoa",
] as const;

const TEXT_FIELDS = [
  "passivaBorder",
  "ultBorder",
  "bloodArmorBorder",
  "bloodShieldBorder",
  "transformBorder",
  "neutralBorder",
  "hightecBorder",
  "versatilBorder",
  "angelicalBorder",
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
      vlad: migrateVlad(
        restoreFighter(parsed.fighters.Vlad, fallback.vlad, limits.Vlad),
        parsed.fighters.Vlad
      ),
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

function migrateVlad(fighter: FighterState, saved: unknown): FighterState {
  const next = { ...fighter };
  const plain = next.transformOn === 0 && next.bloodArmorOn === 0 && next.bloodShieldOn === 0;
  if (plain && next.constituicaoMod === 5) next.constituicaoMod = 7;
  if (plain && next.ataque === 5) next.ataque = 7;
  if (plain && next.ca === 17) next.ca = 19;
  if (next.hp === 234) next.hp = 324;
  if (next.mp === 82) next.mp = 116;
  if (
    isRecord(saved) &&
    saved.sobrevida === undefined &&
    armorDeVlad[next.armorIndex]?.name === "Armadura Neutral"
  ) {
    next.sobrevida = 90;
  }
  if (next.transformOn === 1 && next.transformBonus !== 1) {
    next.forcaMod -= 3;
    next.destrezaMod -= 3;
    next.inteligenciaMod -= 3;
    next.constituicaoMod -= 3;
    next.carismaMod += 1;
    next.sabedoriaMod += 1;
    next.ca -= 2;
    next.ataque -= 3;
    next.transformBonus = 1;
  }
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
  next.angelical = VERSATIL_MODES.includes(saved.angelical as VersatilMode)
    ? (saved.angelical as VersatilMode)
    : fallback.angelical;
  next.selectedSkill =
    typeof saved.selectedSkill === "string" && limits.skills.includes(saved.selectedSkill)
      ? saved.selectedSkill
      : fallback.selectedSkill;
  next.reflexoMarks = pickReflexo(saved.reflexoMarks, fallback.reflexoMarks);
  next.reflexoOpen = false;

  return next;
}

function pickReflexo(value: unknown, fallback: ReflexoMark[]): ReflexoMark[] {
  if (!Array.isArray(value)) return fallback;

  const marks: ReflexoMark[] = [];
  for (const item of value) {
    if (marks.length >= 8 || !isRecord(item)) continue;
    const id = typeof item.id === "string" ? item.id.trim().slice(0, 40) : "";
    if (!id || marks.some((mark) => mark.id === id)) continue;
    const name = typeof item.name === "string" ? item.name.slice(0, 40) : "Inimigo";
    const stacks =
      typeof item.stacks === "number" && Number.isInteger(item.stacks)
        ? Math.max(0, Math.min(99, item.stacks))
        : 0;
    marks.push({ id, name, stacks });
  }

  return marks.length > 0 ? marks : fallback;
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
