import { BattleTheme } from "./types";

type ThemeSwitchProps = {
  theme: BattleTheme;
  onChange: (theme: BattleTheme) => void;
  variant?: "classic" | "mesa";
};

export default function ThemeSwitch({
  theme,
  onChange,
  variant = "classic",
}: ThemeSwitchProps) {
  const classic = variant === "classic";

  return (
    <div
      className={
        classic
          ? "flex items-center gap-2 text-sm"
          : "mesa-theme"
      }
      role="group"
      aria-label="Estilo da batalha"
    >
      <span className={classic ? "font-bold uppercase tracking-wide" : "mesa-theme-label"}>
        Estilo
      </span>
      <button
        type="button"
        className={buttonClass(classic, theme === "classic")}
        onClick={() => onChange("classic")}
        aria-pressed={theme === "classic"}
      >
        Clássico
      </button>
      <button
        type="button"
        className={buttonClass(classic, theme === "mesa")}
        onClick={() => onChange("mesa")}
        aria-pressed={theme === "mesa"}
      >
        Mesa
      </button>
    </div>
  );
}

function buttonClass(classic: boolean, active: boolean) {
  if (!classic) {
    return active ? "mesa-theme-btn is-on" : "mesa-theme-btn";
  }

  return active
    ? "px-3 py-1 rounded-md bg-gray-baldurBorder text-black font-bold"
    : "px-3 py-1 rounded-md border border-gray-baldurBorder text-gray-baldurText";
}
