import { FormEvent, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogOverlay, DialogPortal } from "../../components/ui/dialog";
import { BattleTheme } from "../types";
import { useBattleDialogView } from "./BattleDialogs";
import "./BattleNotice.css";

const INVALID_NUMBER = "Por favor, insira um número válido.";

type BattleNoticeProps = {
  theme: BattleTheme;
};

export default function BattleNotice({ theme }: BattleNoticeProps) {
  const {
    current,
    acceptMessage,
    submitNumber,
    cancelNumber,
    acceptConfirm,
    cancelConfirm,
    pickChoice,
    cancelChoice,
  } = useBattleDialogView();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDraft("");
    setError("");
  }, [current?.id]);

  const open = current !== null;

  const confirmNumber = () => {
    const trimmed = draft.trim();
    if (!trimmed || Number.isNaN(Number(trimmed))) {
      setError(INVALID_NUMBER);
      return;
    }
    submitNumber(Number(trimmed));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    confirmNumber();
  };

  const onEscape = () => {
    if (current?.kind === "number") cancelNumber();
    else if (current?.kind === "confirm") cancelConfirm();
    else if (current?.kind === "choice") cancelChoice();
    else acceptMessage();
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
            onEscape();
          }}
          onPointerDownOutside={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          {current?.kind === "message" ? (
            <div className={theme === "mesa" ? "battle-notice-inset" : undefined}>
              <DialogPrimitive.Title>Aviso</DialogPrimitive.Title>
              <DialogPrimitive.Description>{current.text}</DialogPrimitive.Description>
              <div className="battle-notice-actions">
                <button type="button" className="battle-notice-ok" onClick={acceptMessage}>
                  Ok
                </button>
              </div>
            </div>
          ) : null}
          {current?.kind === "confirm" ? (
            <div className={theme === "mesa" ? "battle-notice-inset" : undefined}>
              <DialogPrimitive.Title>Nova luta</DialogPrimitive.Title>
              <DialogPrimitive.Description>{current.text}</DialogPrimitive.Description>
              <div className="battle-notice-actions">
                <button
                  type="button"
                  className="battle-notice-cancel"
                  onClick={cancelConfirm}
                  autoFocus
                >
                  Cancelar
                </button>
                <button type="button" className="battle-notice-confirm" onClick={acceptConfirm}>
                  Recomeçar
                </button>
              </div>
            </div>
          ) : null}
          {current?.kind === "choice" ? (
            <div className={theme === "mesa" ? "battle-notice-inset" : undefined}>
              <DialogPrimitive.Title>{current.title}</DialogPrimitive.Title>
              <DialogPrimitive.Description>{current.text}</DialogPrimitive.Description>
              <div className="battle-notice-choices">
                {current.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={
                      option.id === "off" ? "battle-notice-cancel" : "battle-notice-confirm"
                    }
                    onClick={() => pickChoice(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="battle-notice-actions">
                <button type="button" className="battle-notice-cancel" onClick={cancelChoice}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : null}
          {current?.kind === "number" ? (
            <div className={theme === "mesa" ? "battle-notice-inset" : undefined}>
              <form onSubmit={onSubmit}>
                <DialogPrimitive.Title>{current.text}</DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  Digite um número e confirme, ou cancele.
                </DialogPrimitive.Description>
                <input
                  autoFocus
                  inputMode="decimal"
                  aria-label={current.text}
                  value={draft}
                  onChange={(event) => {
                    setDraft(event.target.value);
                    if (error) setError("");
                  }}
                />
                {error ? <p className="battle-notice-error">{error}</p> : null}
                <div className="battle-notice-actions">
                  <button type="button" className="battle-notice-cancel" onClick={cancelNumber}>
                    Cancelar
                  </button>
                  <button type="submit" className="battle-notice-confirm">
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
