import { useState } from "react";
import { BattleTheme } from "./types";

const THEME_KEY = "rpg-battle-theme";

function readTheme(): BattleTheme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "classic" || saved === "mesa") return saved;
  } catch {
    return "mesa";
  }
  return "mesa";
}

export function useBattleTheme() {
  const [theme, setThemeState] = useState<BattleTheme>(readTheme);

  const setTheme = (next: BattleTheme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* o estilo ainda vale nesta visita */
    }
  };

  return [theme, setTheme] as const;
}
