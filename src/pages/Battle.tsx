import { BattleSessionProvider, useBattleSession } from "../battle/BattleSession";
import { BattleDialogProvider } from "../battle/dialogs/BattleDialogs";
import BattleNotice from "../battle/dialogs/BattleNotice";
import ReflexoPanel from "../battle/dialogs/ReflexoPanel";
import MesaBattle from "../battle/mesa/MesaBattle";
import ThemeSwitch from "../battle/ThemeSwitch";
import { useBattleTheme } from "../battle/useBattleTheme";
import CharacterBattleAlexia from "../components/charactersBattle/characterBattleAlexia";
import CharacterBattleRiven from "../components/charactersBattle/characterBattleRiven";
import CharacterBattleVlad from "../components/charactersBattle/characterbattleVlad";
import ContainerTurn from "../components/container/containerTurn";

export default function Battle() {
  return (
    <BattleDialogProvider>
      <BattleSessionProvider>
        <BattleScreen />
      </BattleSessionProvider>
    </BattleDialogProvider>
  );
}

function BattleScreen() {
  const [theme, setTheme] = useBattleTheme();

  return (
    <>
      {theme === "mesa" ? (
        <MesaBattle theme={theme} onTheme={setTheme} />
      ) : (
        <ClassicBattle onTheme={setTheme} />
      )}
      <BattleNotice theme={theme} />
      <ReflexoPanel theme={theme} />
    </>
  );
}

function ClassicBattle({ onTheme }: { onTheme: (theme: "classic" | "mesa") => void }) {
  const session = useBattleSession();

  return (
    <div className="bg-gray-baldurBg min-h-[1400px] text-gray-baldurText overflow-x-auto">
      <div className="flex justify-end items-center gap-3 px-4 pt-3">
        <button
          type="button"
          className="px-3 py-1 rounded-md border border-gray-baldurBorder text-sm font-bold"
          onClick={session.restart}
        >
          Nova luta
        </button>
        <ThemeSwitch theme="classic" onChange={onTheme} />
      </div>
      <ContainerTurn
        round={session.round}
        onNext={session.nextRound}
        onPrev={session.prevRound}
      />
      <CharacterBattleVlad />
      <CharacterBattleAlexia />
      <CharacterBattleRiven />
    </div>
  );
}
