import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  alexiaStatus,
  rivenStatus,
  vladStatus,
} from "../components/data/characterStatus";
import { skillsAlexia, skillsRiven, skillsVlad } from "../components/data/skillsCharacters";
import {
  secondSkillsAlexia,
  secondSkillsRiven,
  secondSkillsVlad,
} from "../components/data/secondSkillCharacters";
import {
  armasDeAlexia,
  armasDeRiven,
  armasDeVlad,
} from "../components/data/itensBattleCharacters";
import {
  armorDeAlexia,
  armorDeRiven,
  armorDeVlad,
} from "../components/data/armorBattleCharacters";
import { CharacterStatus } from "../components/types/CharacterStatus";
import { Item } from "../components/types/Item";
import { Skills } from "../components/types/Skills";
import { readBattleSnapshot, writeBattleSnapshot, SaveLimits } from "./battleSave";
import { useBattleDialogs } from "./dialogs/BattleDialogs";
import { applyAlexiaSkill } from "./skills/alexia";
import { applyRivenSkill, spendRivenAntiAtirador } from "./skills/riven";
import {
  applyVladArmor,
  applyVladIncomingDamage,
  applyVladSkill,
  freshReflexoMarks,
  spendReflexo,
  spendVladAntiAtirador,
} from "./skills/vlad";
import { clampResource } from "./skills/shared";
import {
  BattleSession,
  FighterController,
  FighterId,
  FighterState,
} from "./types";

function createState(
  status: CharacterStatus,
  ataque: number,
  selectedSkill: string
): FighterState {
  return {
    hp: status.hp,
    mp: status.mp,
    ca: status.ca,
    ataque,
    carga: status.carga,
    forcaMod: status.forcaModificador,
    destrezaMod: status.destrezaModificador,
    constituicaoMod: status.constituicaoModificador,
    inteligenciaMod: status.inteligenciaModificador,
    carismaMod: status.carismaModificador,
    sabedoriaMod: status.sabedoriaModificador,
    damageInput: 0,
    healInput: 0,
    manaInput: 0,
    weaponIndex: 0,
    armorIndex: 0,
    passiva: 0,
    passivaBorder: "",
    ult: 0,
    ultBorder: "",
    bloodArmorOn: 0,
    bloodArmorBorder: "",
    bloodShieldOn: 0,
    bloodShieldBorder: "",
    transformOn: 0,
    transformBorder: "",
    transformBonus: 0,
    sobrevida: 0,
    neutralCrit: 1,
    neutralDefesa: 0,
    neutralBorder: "",
    hightecOn: 0,
    hightecBorder: "",
    antiAtirador: 5,
    transfusaoCount: 0,
    versatil: "off",
    versatilBorder: "",
    nevoa: 1,
    angelical: "off",
    angelicalBorder: "",
    reflexoMarks: freshReflexoMarks(),
    reflexoOpen: false,
    selectedSkill,
  };
}

const SAVE_LIMITS: SaveLimits = {
  Vlad: {
    maxHp: vladStatus.hp,
    maxMp: vladStatus.mp,
    weapons: armasDeVlad.length,
    armors: armorDeVlad.length,
    skills: [...secondSkillsVlad, ...skillsVlad].map((skill) => skill.name),
  },
  Alexia: {
    maxHp: alexiaStatus.hp,
    maxMp: alexiaStatus.mp,
    weapons: armasDeAlexia.length,
    armors: armorDeAlexia.length,
    skills: [...secondSkillsAlexia, ...skillsAlexia].map((skill) => skill.name),
  },
  Riven: {
    maxHp: rivenStatus.hp,
    maxMp: rivenStatus.mp,
    weapons: armasDeRiven.length,
    armors: armorDeRiven.length,
    skills: [...secondSkillsRiven, ...skillsRiven].map((skill) => skill.name),
  },
};

function freshFight() {
  return {
    round: 1,
    activeId: "Vlad" as const,
    vlad: createState(vladStatus, vladStatus.constituicaoModificador, secondSkillsVlad[0].name),
    alexia: createState(
      alexiaStatus,
      alexiaStatus.inteligenciaModificador,
      secondSkillsAlexia[0].name
    ),
    riven: createState(
      rivenStatus,
      rivenStatus.constituicaoModificador,
      secondSkillsRiven[0].name
    ),
  };
}

type SkillApply = (
  name: string,
  state: FighterState,
  setState: Dispatch<SetStateAction<FighterState>>,
  maxHp: number,
  maxMp: number,
  dialogs: ReturnType<typeof useBattleDialogs>
) => void | Promise<void>;

function buildFighter(args: {
  id: FighterId;
  state: FighterState;
  setState: Dispatch<SetStateAction<FighterState>>;
  maxHp: number;
  maxMp: number;
  skills: Skills[];
  secondSkills: Skills[];
  weapons: Item[];
  armors: Item[];
  apply: SkillApply;
  dialogs: ReturnType<typeof useBattleDialogs>;
  useAntiAtirador: () => void;
}): FighterController {
  const { state, setState, maxHp, maxMp, apply, dialogs } = args;
  const allSkills = [...args.secondSkills, ...args.skills];

  return {
    ...state,
    id: args.id,
    maxHp,
    maxMp,
    skills: args.skills,
    secondSkills: args.secondSkills,
    allSkills,
    weapons: args.weapons,
    armors: args.armors,
    setDamageInput: (value) =>
      setState((current) => ({ ...current, damageInput: value })),
    setHealInput: (value) =>
      setState((current) => ({ ...current, healInput: value })),
    setManaInput: (value) =>
      setState((current) => ({ ...current, manaInput: value })),
    applyDamage: () => {
      if (args.id === "Vlad") {
        void applyVladIncomingDamage(setState, maxHp, dialogs);
        return;
      }
      setState((current) => ({
        ...current,
        hp: clampResource(current.hp - current.damageInput, maxHp),
      }));
    },
    applyHeal: () =>
      setState((current) => ({
        ...current,
        hp: clampResource(current.hp + current.healInput, maxHp),
      })),
    applyMana: () =>
      setState((current) => ({
        ...current,
        mp: clampResource(current.mp + current.manaInput, maxMp),
      })),
    setWeaponIndex: (index) =>
      setState((current) => ({ ...current, weaponIndex: index })),
    setArmorIndex: (index) =>
      setState((current) =>
        args.id === "Vlad"
          ? applyVladArmor(current, index, args.armors)
          : { ...current, armorIndex: index }
      ),
    setSelectedSkill: (name) =>
      setState((current) => ({ ...current, selectedSkill: name })),
    useSkill: (name) => {
      void apply(name, state, setState, maxHp, maxMp, dialogs);
    },
    useAntiAtirador: args.useAntiAtirador,
    useRegeneracao: () => {
      void apply("Regeneração", state, setState, maxHp, maxMp, dialogs);
    },
    useGladiador: () => {
      void apply("Gladiador Imortal", state, setState, maxHp, maxMp, dialogs);
    },
  };
}

export function useBattleSessionState(): BattleSession {
  const dialogs = useBattleDialogs();
  const [saved] = useState(() => readBattleSnapshot(freshFight(), SAVE_LIMITS));
  const [round, setRound] = useState(saved.round);
  const [activeId, setActiveId] = useState<FighterId>(saved.activeId);
  const [vladState, setVladState] = useState(saved.vlad);
  const [alexiaState, setAlexiaState] = useState(saved.alexia);
  const [rivenState, setRivenState] = useState(saved.riven);

  useEffect(() => {
    writeBattleSnapshot({
      round,
      activeId,
      vlad: vladState,
      alexia: alexiaState,
      riven: rivenState,
    });
  }, [round, activeId, vladState, alexiaState, rivenState]);

  const vlad = buildFighter({
    id: "Vlad",
    state: vladState,
    setState: setVladState,
    maxHp: vladStatus.hp,
    maxMp: vladStatus.mp,
    skills: skillsVlad,
    secondSkills: secondSkillsVlad,
    weapons: armasDeVlad,
    armors: armorDeVlad,
    apply: applyVladSkill,
    dialogs,
    useAntiAtirador: () => spendVladAntiAtirador(vladState, setVladState),
  });

  const alexia = buildFighter({
    id: "Alexia",
    state: alexiaState,
    setState: setAlexiaState,
    maxHp: alexiaStatus.hp,
    maxMp: alexiaStatus.mp,
    skills: skillsAlexia,
    secondSkills: secondSkillsAlexia,
    weapons: armasDeAlexia,
    armors: armorDeAlexia,
    apply: applyAlexiaSkill,
    dialogs,
    useAntiAtirador: () => undefined,
  });

  const riven = buildFighter({
    id: "Riven",
    state: rivenState,
    setState: setRivenState,
    maxHp: rivenStatus.hp,
    maxMp: rivenStatus.mp,
    skills: skillsRiven,
    secondSkills: secondSkillsRiven,
    weapons: armasDeRiven,
    armors: armorDeRiven,
    apply: applyRivenSkill,
    dialogs,
    useAntiAtirador: () => spendRivenAntiAtirador(setRivenState),
  });

  const fighters: Record<FighterId, FighterController> = {
    Vlad: vlad,
    Alexia: alexia,
    Riven: riven,
  };

  return {
    round,
    nextRound: () => {
      setRound((current) => current + 1);
      void (async () => {
        await applyVladSkill(
          "Sangue de Ferro",
          vladState,
          setVladState,
          vladStatus.hp,
          vladStatus.mp,
          dialogs
        );
        await applyRivenSkill(
          "Onipresença",
          rivenState,
          setRivenState,
          rivenStatus.hp,
          rivenStatus.mp,
          dialogs
        );
      })();
    },
    prevRound: () => {
      setRound((current) => (current > 1 ? current - 1 : current));
    },
    restart: () => {
      void (async () => {
        const accepted = await dialogs.confirm(
          "Recomeçar a luta? Vida, mana, rodada, equipamentos e contadores voltam ao início."
        );
        if (!accepted) return;
        const next = freshFight();
        setRound(next.round);
        setActiveId(next.activeId);
        setVladState(next.vlad);
        setAlexiaState(next.alexia);
        setRivenState(next.riven);
      })();
    },
    activeId,
    setActiveId,
    vlad,
    alexia,
    riven,
    fighter: (id) => fighters[id],
    setReflexoMarks: (update) => {
      setVladState((current) => ({
        ...current,
        reflexoMarks: update(current.reflexoMarks).slice(0, 8),
      }));
    },
    closeReflexo: () => {
      setVladState((current) => ({ ...current, reflexoOpen: false }));
    },
    useReflexo: (id) => spendReflexo(vladState, setVladState, vladStatus.mp, id),
  };
}
