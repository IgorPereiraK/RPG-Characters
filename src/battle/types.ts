import { Item } from "../components/types/Item";
import { Skills } from "../components/types/Skills";

export type FighterId = "Vlad" | "Alexia" | "Riven";
export type BattleTheme = "classic" | "mesa";
export type VersatilMode = "off" | "ataque" | "defesa";

export type FighterState = {
  hp: number;
  mp: number;
  ca: number;
  ataque: number;
  carga?: number;
  forcaMod: number;
  destrezaMod: number;
  constituicaoMod: number;
  inteligenciaMod: number;
  carismaMod: number;
  sabedoriaMod: number;
  damageInput: number;
  healInput: number;
  manaInput: number;
  weaponIndex: number;
  armorIndex: number;
  passiva: number;
  passivaBorder: string;
  ult: number;
  ultBorder: string;
  bloodArmorOn: number;
  bloodArmorBorder: string;
  bloodShieldOn: number;
  bloodShieldBorder: string;
  transformOn: number;
  transformBorder: string;
  hightecOn: number;
  hightecBorder: string;
  antiAtirador: number;
  transfusaoCount: number;
  versatil: VersatilMode;
  versatilBorder: string;
  selectedSkill: string;
};

export type FighterController = FighterState & {
  id: FighterId;
  maxHp: number;
  maxMp: number;
  skills: Skills[];
  secondSkills: Skills[];
  allSkills: Skills[];
  weapons: Item[];
  armors: Item[];
  setDamageInput: (value: number) => void;
  setHealInput: (value: number) => void;
  setManaInput: (value: number) => void;
  applyDamage: () => void;
  applyHeal: () => void;
  applyMana: () => void;
  setWeaponIndex: (index: number) => void;
  setArmorIndex: (index: number) => void;
  setSelectedSkill: (name: string) => void;
  useSkill: (name: string) => void;
  useAntiAtirador: () => void;
  useRegeneracao: () => void;
  useGladiador: () => void;
};

export type BattleSession = {
  round: number;
  nextRound: () => void;
  prevRound: () => void;
  restart: () => void;
  activeId: FighterId;
  setActiveId: (id: FighterId) => void;
  vlad: FighterController;
  alexia: FighterController;
  riven: FighterController;
  fighter: (id: FighterId) => FighterController;
};
