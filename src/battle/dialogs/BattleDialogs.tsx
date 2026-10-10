import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export type DialogChoice = {
  id: string;
  label: string;
};

export type BattleDialogs = {
  notify: (text: string) => Promise<void>;
  askNumber: (question: string) => Promise<number | null>;
  confirm: (text: string) => Promise<boolean>;
  choose: (title: string, text: string, options: DialogChoice[]) => Promise<string | null>;
};

type MessageItem = {
  id: number;
  kind: "message";
  text: string;
  resolve: () => void;
};

type NumberItem = {
  id: number;
  kind: "number";
  text: string;
  resolve: (value: number | null) => void;
};

type ConfirmItem = {
  id: number;
  kind: "confirm";
  text: string;
  resolve: (accepted: boolean) => void;
};

type ChoiceItem = {
  id: number;
  kind: "choice";
  title: string;
  text: string;
  options: DialogChoice[];
  resolve: (value: string | null) => void;
};

export type DialogItem = MessageItem | NumberItem | ConfirmItem | ChoiceItem;

type DialogView = {
  current: DialogItem | null;
  acceptMessage: () => void;
  submitNumber: (value: number) => void;
  cancelNumber: () => void;
  acceptConfirm: () => void;
  cancelConfirm: () => void;
  pickChoice: (id: string) => void;
  cancelChoice: () => void;
};

const DialogApiContext = createContext<BattleDialogs | null>(null);
const DialogViewContext = createContext<DialogView | null>(null);

export function BattleDialogProvider({ children }: { children: ReactNode }) {
  const queueRef = useRef<DialogItem[]>([]);
  const currentRef = useRef<DialogItem | null>(null);
  const idRef = useRef(0);
  const [current, setCurrent] = useState<DialogItem | null>(null);

  const present = useCallback((item: DialogItem) => {
    if (!currentRef.current) {
      currentRef.current = item;
      setCurrent(item);
      return;
    }
    queueRef.current.push(item);
  }, []);

  const advance = useCallback((settled: DialogItem, value?: number | boolean | string | null) => {
    if (currentRef.current !== settled) return;
    const next = queueRef.current.shift() ?? null;
    currentRef.current = next;
    setCurrent(next);
    if (settled.kind === "message") settled.resolve();
    else if (settled.kind === "number") settled.resolve(typeof value === "number" ? value : null);
    else if (settled.kind === "confirm") settled.resolve(value === true);
    else settled.resolve(typeof value === "string" ? value : null);
  }, []);

  const dialogs = useMemo<BattleDialogs>(
    () => ({
      notify: (text) =>
        new Promise<void>((resolve) => {
          present({
            id: ++idRef.current,
            kind: "message",
            text,
            resolve,
          });
        }),
      askNumber: (question) =>
        new Promise<number | null>((resolve) => {
          present({
            id: ++idRef.current,
            kind: "number",
            text: question,
            resolve,
          });
        }),
      confirm: (text) =>
        new Promise<boolean>((resolve) => {
          present({
            id: ++idRef.current,
            kind: "confirm",
            text,
            resolve,
          });
        }),
      choose: (title, text, options) =>
        new Promise<string | null>((resolve) => {
          present({
            id: ++idRef.current,
            kind: "choice",
            title,
            text,
            options,
            resolve,
          });
        }),
    }),
    [present]
  );

  const view = useMemo<DialogView>(
    () => ({
      current,
      acceptMessage: () => {
        if (currentRef.current?.kind === "message") advance(currentRef.current);
      },
      submitNumber: (value) => {
        if (currentRef.current?.kind === "number") advance(currentRef.current, value);
      },
      cancelNumber: () => {
        if (currentRef.current?.kind === "number") advance(currentRef.current, null);
      },
      acceptConfirm: () => {
        if (currentRef.current?.kind === "confirm") advance(currentRef.current, true);
      },
      cancelConfirm: () => {
        if (currentRef.current?.kind === "confirm") advance(currentRef.current, false);
      },
      pickChoice: (id) => {
        if (currentRef.current?.kind === "choice") advance(currentRef.current, id);
      },
      cancelChoice: () => {
        if (currentRef.current?.kind === "choice") advance(currentRef.current, null);
      },
    }),
    [advance, current]
  );

  return (
    <DialogApiContext.Provider value={dialogs}>
      <DialogViewContext.Provider value={view}>{children}</DialogViewContext.Provider>
    </DialogApiContext.Provider>
  );
}

export function useBattleDialogs() {
  const dialogs = useContext(DialogApiContext);
  if (!dialogs) {
    throw new Error("useBattleDialogs precisa estar dentro da batalha.");
  }
  return dialogs;
}

export function useBattleDialogView() {
  const view = useContext(DialogViewContext);
  if (!view) {
    throw new Error("useBattleDialogView precisa estar dentro da batalha.");
  }
  return view;
}
