import { createContext, ReactNode, useContext } from "react";
import { useBattleSessionState } from "./useBattleSessionState";
import { BattleSession } from "./types";

const BattleContext = createContext<BattleSession | null>(null);

export function BattleSessionProvider({ children }: { children: ReactNode }) {
  const session = useBattleSessionState();
  return (
    <BattleContext.Provider value={session}>{children}</BattleContext.Provider>
  );
}

export function useBattleSession() {
  const session = useContext(BattleContext);
  if (!session) {
    throw new Error("useBattleSession precisa estar dentro da batalha.");
  }
  return session;
}
