import { Item } from "../components/types/Item";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

type GearDialogProps = {
  items: Item[];
  index: number;
  onSelect: (index: number) => void;
  title: string;
  variant: "classic" | "mesa";
};

export default function GearDialog({
  items,
  index,
  onSelect,
  title,
  variant,
}: GearDialogProps) {
  const selected = items[index] ?? items[0];
  if (!selected) return null;

  const mesa = variant === "mesa";
  const triggerClass = mesa
    ? "mesa-gear"
    : "w-[91px] h-24 border-2 border-black overflow-hidden";

  return (
    <Dialog>
      <DialogTrigger className={triggerClass} aria-label={selected.name}>
        <img
          src={selected.imagem}
          alt={selected.name}
          className={mesa ? undefined : "h-full w-full object-cover"}
        />
      </DialogTrigger>
      <DialogContent
        className={
          mesa
            ? "mesa-dialog"
            : "bg-gray-baldurBgSecond text-gray-baldurText max-h-[85vh] overflow-y-auto"
        }
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <div className={mesa ? "mesa-gear-grid" : "grid grid-cols-2 sm:grid-cols-3 gap-4 px-2 cursor-pointer w-full py-4 mt-4"}>
              {items.map((item, itemIndex) => (
                <button
                  type="button"
                  key={`${item.name}-${itemIndex}`}
                  onClick={() => onSelect(itemIndex)}
                  className={
                    mesa
                      ? `mesa-gear-pick ${itemIndex === index ? "is-on" : ""}`
                      : itemIndex === index
                        ? "border-2 border-gray-baldurBorder"
                        : "border-2 border-black"
                  }
                >
                  <img
                    src={item.imagem}
                    alt={item.name}
                    className={mesa ? undefined : "h-24 w-full object-cover"}
                  />
                </button>
              ))}
            </div>
            <div className={mesa ? "mesa-gear-preview" : "mt-6 border-t-2 border-gray-baldurBorder py-4"}>
              <img
                src={selected.imagem}
                alt=""
                className={mesa ? undefined : "h-24 w-24 object-cover"}
              />
              <div>
                <h3 className={mesa ? undefined : "text-xl text-gray-100 font-bold mb-1"}>
                  {selected.name}
                </h3>
                {selected.dano ? (
                  <p className={mesa ? undefined : "text-lg text-gray-100"}>{selected.dano}</p>
                ) : null}
                <p className={mesa ? "whitespace-pre-line" : "text-gray-baldurText text-base mt-4 whitespace-pre-line"}>
                  {selected.texto}
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
