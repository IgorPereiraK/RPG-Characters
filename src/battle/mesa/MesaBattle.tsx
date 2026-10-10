import "./MesaBattle.css";
import { useEffect, useState } from "react";
import { characterInfo } from "../../components/data/characterInfo";
import {
  alexiaStatus,
  rivenStatus,
  vladStatus,
} from "../../components/data/characterStatus";
import ButtonProficienciaAlexia from "../../components/buttons/buttonProficienciaAlexia";
import ButtonProficienciaRiven from "../../components/buttons/buttonProficienciaRiven";
import ButtonProficienciaVlad from "../../components/buttons/buttonProficienciaVlad";
import { CharacterStatus } from "../../components/types/CharacterStatus";
import { useBattleSession } from "../BattleSession";
import FighterProfile from "../FighterProfile";
import GearDialog from "../GearDialog";
import { skillBorder, skillCharge } from "../skillVisual";
import ThemeSwitch from "../ThemeSwitch";
import { BattleTheme, FighterController, FighterId } from "../types";
import { Skills } from "../../components/types/Skills";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const PASSIVES = new Set([
  "Sangue de Ferro",
  "Foco de Força",
  "Regeneração",
  "Gladiador Imortal",
  "Versátil",
  "Armadura Neutral",
  "Tiro Perfurante",
  "Armadura Hightec",
  "Defesa Hightec",
  "Fotossíntese",
  "Onipresença",
]);

function useDesktopMesa() {
  const query = "(min-width: 1051px)";
  const [desktop, setDesktop] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return desktop;
}

const ORDER: FighterId[] = ["Vlad", "Alexia", "Riven"];

const STATUS: Record<FighterId, CharacterStatus> = {
  Vlad: vladStatus,
  Alexia: alexiaStatus,
  Riven: rivenStatus,
};

const INFO_KEY: Record<FighterId, "Vlad" | "Alexia" | "Riven"> = {
  Vlad: "Vlad",
  Alexia: "Alexia",
  Riven: "Riven",
};

type MesaBattleProps = {
  theme: BattleTheme;
  onTheme: (theme: BattleTheme) => void;
};

export default function MesaBattle({ theme, onTheme }: MesaBattleProps) {
  const session = useBattleSession();
  const desktop = useDesktopMesa();
  const fighter = session.fighter(session.activeId);
  const info = characterInfo[INFO_KEY[fighter.id]];
  const status = STATUS[fighter.id];
  const selected =
    fighter.allSkills.find((skill) => skill.name === fighter.selectedSkill) ??
    fighter.allSkills[0];
  const passives = fighter.allSkills.filter((skill) => PASSIVES.has(skill.name));
  const abilities = fighter.allSkills.filter((skill) => !PASSIVES.has(skill.name));

  const attrs = [
    ["Força", status.forcaValor, fighter.forcaMod],
    ["Destreza", status.destrezaValor, fighter.destrezaMod],
    ["Constituição", status.constituicaoValor, fighter.constituicaoMod],
    ["Inteligência", status.inteligenciaValor, fighter.inteligenciaMod],
    ["Carisma", status.carismaValor, fighter.carismaMod],
    ["Sabedoria", status.sabedoriaValor, fighter.sabedoriaMod],
  ] as const;

  return (
    <div className={`mesa-bg mesa-${fighter.id.toLowerCase()}`}>
      <div className="mesa-stage">
        <div className="mesa-top">
          <div className="mesa-rounds">
            <button type="button" className="mesa-btn red" onClick={session.prevRound}>
              Anterior
            </button>
            <div className="mesa-metal">
              <h1 className="mesa-plaque mesa-inset">Rodada {session.round}</h1>
            </div>
            <button type="button" className="mesa-btn red" onClick={session.nextRound}>
              Próximo
            </button>
          </div>
          <div className="mesa-tools">
            <button type="button" className="mesa-btn red" onClick={session.restart}>
              Nova luta
            </button>
            <ThemeSwitch theme={theme} onChange={onTheme} variant="mesa" />
          </div>
        </div>

        <section className="mesa-left">
          <div>
            <span className="mesa-metal mesa-tab mesa-plaque">Equipamentos</span>
            <div className="mesa-metal">
              <div className="mesa-inset">
                <div className="mesa-slots">
                  <GearDialog
                    items={fighter.armors}
                    index={fighter.armorIndex}
                    onSelect={fighter.setArmorIndex}
                    title="Escolha a sua Armadura de Combate"
                    variant="mesa"
                  />
                  <GearDialog
                    items={fighter.weapons}
                    index={fighter.weaponIndex}
                    onSelect={fighter.setWeaponIndex}
                    title="Escolha a sua Arma de Combate"
                    variant="mesa"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="mesa-metal mesa-tab mesa-plaque">Habilidades</span>
            <div className="mesa-metal">
              <div className="mesa-inset">
                <TooltipProvider delayDuration={200}>
                  <SkillGroup
                    title="Passivas"
                    skills={passives}
                    fighter={fighter}
                    desktop={desktop}
                    selectedName={selected?.name}
                  />
                  <SkillGroup
                    title="Habilidades"
                    skills={abilities}
                    fighter={fighter}
                    desktop={desktop}
                    selectedName={selected?.name}
                  />
                </TooltipProvider>
                {!desktop && selected ? (
                  <div className="mesa-parch">
                    <h3>{selected.name}</h3>
                    <div>{selected.description}</div>
                    <div className="meta">
                      <span>{selected.magic}</span>
                      <span>{selected.mana}</span>
                      <span>{selected.type}</span>
                    </div>
                    <button
                      type="button"
                      className="mesa-btn mesa-use"
                      onClick={() => fighter.useSkill(selected.name)}
                    >
                      Usar
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className={`mesa-center ${fighter.hp <= 0 ? "mesa-dead" : ""}`}>
          <FighterProfile id={fighter.id} variant="mesa" triggerClassName="mesa-arch-btn">
            <div className="mesa-arch">
              <img src={status.perfil} alt={info.name} />
            </div>
          </FighterProfile>
          <h2 className="mesa-plaque mesa-name">{info.name}</h2>
          <div className="mesa-sub">
            Nível {info.level} · {info.classe}
          </div>
        </section>

        <section className="mesa-right">
          <div>
            <span className="mesa-metal mesa-tab mesa-plaque">Atributos</span>
            <div className="mesa-metal">
              <div className="mesa-inset">
                <div className="mesa-combat">
                  <div className="mesa-atk">
                    <small>Ataque</small>
                    <b>+{fighter.ataque}</b>
                  </div>
                  {fighter.carga !== undefined ? (
                    <div className="mesa-carga">
                      <small>Carga</small>
                      <b>{fighter.carga}</b>
                    </div>
                  ) : null}
                  <div className="mesa-shield">
                    <div>
                      <small>CA</small>
                      <b>{fighter.ca}</b>
                    </div>
                  </div>
                </div>
                <table className="mesa-attrs">
                  <thead>
                    <tr>
                      <th>Atributo</th>
                      <th className="v">Valor</th>
                      <th style={{ textAlign: "right" }}>Mod.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attrs.map(([label, value, mod]) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td className="v">{value}</td>
                        <td className={`m ${mod >= 0 ? "mesa-pos" : "mesa-neg"}`}>
                          {mod >= 0 ? `+${mod}` : mod}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mesa-prof">
                  {fighter.id === "Vlad" ? (
                    <ButtonProficienciaVlad vladStatus={vladStatus} variant="mesa" />
                  ) : null}
                  {fighter.id === "Alexia" ? (
                    <ButtonProficienciaAlexia alexiaStatus={alexiaStatus} variant="mesa" />
                  ) : null}
                  {fighter.id === "Riven" ? (
                    <ButtonProficienciaRiven rivenStatus={rivenStatus} variant="mesa" />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mesa-bottom">
          <div className="mesa-vit">
            <ResourceBar
              kind="hp"
              label="Vida"
              current={fighter.hp}
              max={fighter.maxHp}
            />
            <ResourceBar
              kind="mp"
              label="Mana"
              current={fighter.mp}
              max={fighter.maxMp}
            />
            <div className="mesa-ctrls">
              <Control
                label="Dano"
                tone="red"
                value={fighter.damageInput}
                onChange={fighter.setDamageInput}
                onApply={fighter.applyDamage}
              />
              <Control
                label="Cura"
                value={fighter.healInput}
                onChange={fighter.setHealInput}
                onApply={fighter.applyHeal}
              />
              <Control
                label="Mana"
                value={fighter.manaInput}
                onChange={fighter.setManaInput}
                onApply={fighter.applyMana}
              />
            </div>
          </div>
          <div className="mesa-picker">
            {ORDER.map((id) => (
              <button
                type="button"
                key={id}
                className={`mesa-pick ${session.activeId === id ? "sel" : ""}`}
                onClick={() => session.setActiveId(id)}
                title={characterInfo[id].name}
                aria-label={characterInfo[id].name}
                aria-pressed={session.activeId === id}
              >
                <img src={STATUS[id].perfil} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillGroup({
  title,
  skills,
  fighter,
  desktop,
  selectedName,
}: {
  title: string;
  skills: Skills[];
  fighter: FighterController;
  desktop: boolean;
  selectedName?: string;
}) {
  if (skills.length === 0) return null;

  return (
    <div className="mesa-skill-group">
      <h4 className="mesa-skill-label">{title}</h4>
      <div className="mesa-abil">
        {skills.map((skill) => (
          <SkillSlot
            key={skill.name}
            skill={skill}
            fighter={fighter}
            desktop={desktop}
            selected={!desktop && selectedName === skill.name}
            onSelect={
              desktop
                ? () => fighter.useSkill(skill.name)
                : () => fighter.setSelectedSkill(skill.name)
            }
          />
        ))}
      </div>
    </div>
  );
}

function SkillSlot({
  skill,
  fighter,
  selected,
  desktop,
  onSelect,
}: {
  skill: Skills;
  fighter: FighterController;
  selected: boolean;
  desktop: boolean;
  onSelect: () => void;
}) {
  const border = skillBorder(fighter, skill.name);
  const charge = skillCharge(fighter, skill.name);

  const button = (
    <button
      type="button"
      className={`slot ${selected ? "sel" : ""}`}
      style={border ? { outline: `3px solid ${border}`, outlineOffset: "2px" } : undefined}
      onClick={onSelect}
      aria-label={skill.name}
      aria-pressed={selected}
    >
      <img src={skill.image} alt="" />
      {charge?.text ? (
        <span className="mesa-charge">{charge.text}</span>
      ) : charge && charge.value > 0 ? (
        <span className="mesa-charge">
          {charge.value === charge.ready ? "Pronta" : charge.value}
        </span>
      ) : null}
    </button>
  );

  if (!desktop) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent className="mesa-tip" side="right">
        <p className="mesa-tip-name">{skill.name}</p>
        <div className="mesa-tip-body">{skill.description}</div>
        <div className="mesa-tip-meta">
          <span>{skill.magic}</span>
          {skill.mana ? <span>{skill.mana}</span> : null}
          <span>{skill.type}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function ResourceBar({
  kind,
  label,
  current,
  max,
}: {
  kind: "hp" | "mp";
  label: string;
  current: number;
  max: number;
}) {
  const width = Math.max(0, Math.min(100, (current / max) * 100));

  return (
    <div className={`mesa-bar ${kind}`}>
      <i style={{ width: `${width}%` }} />
      <b>
        <span>{label}</span>
        <span>
          {current} / {max}
        </span>
      </b>
    </div>
  );
}

function Control({
  label,
  value,
  onChange,
  onApply,
  tone,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onApply: () => void;
  tone?: "red";
}) {
  return (
    <div className="mesa-ctl">
      <input
        type="number"
        min={0}
        value={value}
        aria-label={label}
        onChange={(event) => {
          const next = parseInt(event.target.value, 10);
          onChange(Number.isNaN(next) ? 0 : next);
        }}
      />
      <button type="button" className={`mesa-btn ${tone ?? ""}`} onClick={onApply}>
        {label}
      </button>
    </div>
  );
}
