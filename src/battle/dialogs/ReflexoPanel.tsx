import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay, DialogPortal } from "../../components/ui/dialog";
import { useBattleSession } from "../BattleSession";
import { BattleTheme } from "../types";
import "./BattleNotice.css";

type ReflexoPanelProps = {
  theme: BattleTheme;
};

export default function ReflexoPanel({ theme }: ReflexoPanelProps) {
  const session = useBattleSession();
  const marks = session.vlad.reflexoMarks;
  const open = session.vlad.reflexoOpen;
  const [notice, setNotice] = useState<{ id: string; text: string } | null>(null);

  useEffect(() => {
    if (!open) setNotice(null);
  }, [open]);

  const rename = (id: string, name: string) => {
    session.setReflexoMarks((current) =>
      current.map((mark) => (mark.id === id ? { ...mark, name: name.slice(0, 40) } : mark))
    );
  };

  const addStack = (id: string) => {
    session.setReflexoMarks((current) =>
      current.map((mark) =>
        mark.id === id ? { ...mark, stacks: Math.min(99, mark.stacks + 1) } : mark
      )
    );
  };

  const removeStack = (id: string) => {
    session.setReflexoMarks((current) =>
      current.map((mark) =>
        mark.id === id ? { ...mark, stacks: Math.max(0, mark.stacks - 1) } : mark
      )
    );
  };

  const addEnemy = () => {
    session.setReflexoMarks((current) => {
      if (current.length >= 8) return current;
      return [
        ...current,
        {
          id: `e-${Date.now()}`,
          name: `Inimigo ${current.length + 1}`,
          stacks: 0,
        },
      ];
    });
  };

  const removeEnemy = (id: string) => {
    session.setReflexoMarks((current) =>
      current.length <= 1 ? current : current.filter((mark) => mark.id !== id)
    );
  };

  return (
    <Dialog open={open}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={`battle-notice ${theme}`}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 50,
          }}
          onEscapeKeyDown={(event) => {
            event.preventDefault();
            session.closeReflexo();
          }}
          onPointerDownOutside={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <div className={theme === "mesa" ? "battle-notice-inset" : undefined}>
            <DialogPrimitive.Title>Reflexo Sanquíneo</DialogPrimitive.Title>
            <DialogPrimitive.Description>
              Cada golpe que este inimigo acerta vira 1 stack de 1d6 só contra ele. Outro
              inimigo fica com a contagem separada.
            </DialogPrimitive.Description>
            <div className="reflexo-list">
              {marks.map((mark) => (
                <div key={mark.id} className="reflexo-enemy">
                  <input
                    className="reflexo-name"
                    aria-label="Nome do inimigo"
                    value={mark.name}
                    onChange={(event) => rename(mark.id, event.target.value)}
                  />
                  <p className="reflexo-stacks">
                    {mark.stacks} {mark.stacks === 1 ? "stack" : "stacks"}
                  </p>
                  <div className="battle-notice-actions">
                    <button
                      type="button"
                      className="battle-notice-confirm"
                      onClick={() => addStack(mark.id)}
                    >
                      Acerto
                    </button>
                    <button
                      type="button"
                      className="battle-notice-cancel"
                      onClick={() => removeStack(mark.id)}
                      disabled={mark.stacks === 0}
                    >
                      Tirar
                    </button>
                    <button
                      type="button"
                      className="battle-notice-confirm"
                      onClick={() =>
                        setNotice({ id: mark.id, text: session.useReflexo(mark.id) })
                      }
                    >
                      Usar
                    </button>
                  </div>
                  {notice?.id === mark.id ? <p className="reflexo-notice">{notice.text}</p> : null}
                  {marks.length > 1 ? (
                    <button
                      type="button"
                      className="battle-notice-cancel reflexo-remove"
                      onClick={() => removeEnemy(mark.id)}
                    >
                      Remover
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="battle-notice-actions">
              <button
                type="button"
                className="battle-notice-confirm"
                onClick={addEnemy}
                disabled={marks.length >= 8}
              >
                Adicionar inimigo
              </button>
              <button
                type="button"
                className="battle-notice-cancel"
                onClick={() => {
                  setNotice(null);
                  session.closeReflexo();
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
