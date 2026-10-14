import { ReactNode } from "react";
import { characterInfo } from "../components/data/characterInfo";
import {
  anotacoesAlexia,
  anotacoesRiven,
  anotacoesVlad,
} from "../components/data/textoCharacters";
import {
  alexiaStatus,
  rivenStatus,
  vladStatus,
} from "../components/data/characterStatus";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatarSmall";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useBattleSession } from "./BattleSession";
import { FighterId } from "./types";

type FighterProfileProps = {
  id: FighterId;
  children: ReactNode;
  triggerClassName?: string;
  variant?: "classic" | "mesa";
};

export default function FighterProfile({
  id,
  children,
  triggerClassName,
  variant = "classic",
}: FighterProfileProps) {
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>{children}</DialogTrigger>
      <DialogContent
        className={
          variant === "mesa"
            ? "mesa-dialog"
            : "bg-gray-baldurBgSecond text-gray-baldurText max-h-[85vh] overflow-y-auto"
        }
      >
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
          <DialogDescription className="pt-4">
            {id === "Vlad" ? <VladProfile /> : null}
            {id === "Alexia" ? <AlexiaProfile /> : null}
            {id === "Riven" ? <RivenProfile /> : null}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function VladProfile() {
  const { vlad } = useBattleSession();
  const info = characterInfo.Vlad;

  return (
    <>
      <div className="flex gap-4 items-center">
        <Avatar className="border-2 border-black">
          <AvatarImage src={vladStatus.perfil} />
          <AvatarFallback>VL</AvatarFallback>
        </Avatar>
        <div className="w-full text-gray-baldurText text-base">
          <div className="border-b-2 border-black flex gap-10 mb-2">
            <h3>
              Nome: <span>{info.name}</span>
            </h3>
            <h3>
              Level: <span>{info.level}</span>
            </h3>
          </div>
          <div className="border-b-2 border-black flex gap-10">
            <h3>
              Classe: <span>{info.classe}</span>
            </h3>
            <h3>
              Alinhamento: <span>{info.alinhamento}</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-xl text-gray-baldurText font-extrabold mb-2">Talentos</h2>
        <div className="flex items-center gap-2 mb-4 text-left">
          <span className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
            <img src="./image/regeneracaoTalento.png" alt="" className="block w-full h-full object-cover" />
          </span>
          <h3 className="text-gray-baldurText">{anotacoesVlad[7].texto}</h3>
        </div>
        <div className="flex items-center gap-2 mb-4 text-left">
          <button
            type="button"
            onClick={vlad.useAntiAtirador}
            className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0"
          >
            <img src="./image/antiAtiradorTalento.png" alt="" className="block w-full h-full object-cover" />
          </button>
          <h3 className="text-gray-baldurText">{anotacoesVlad[8].texto}</h3>
          <span className="text-gray-baldurText font-bold text-lg">{vlad.antiAtirador}</span>
        </div>
        <div className="flex items-center gap-2 mb-4 text-left">
          <span className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
            <img src="./image/duelistaVlad.png" alt="" className="block w-full h-full object-cover" />
          </span>
          <h3 className="text-gray-baldurText">{anotacoesVlad[9].texto}</h3>
        </div>
        <div className="flex items-center gap-2 text-left">
          <button
            type="button"
            onClick={() => vlad.useSkill("Versátil")}
            className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0"
          >
            <img src="./image/Versatil.png" alt="Versátil" className="block w-full h-full object-cover" />
          </button>
          <h3 className="text-gray-baldurText">{anotacoesVlad[10].texto}</h3>
          <span className="text-gray-baldurText font-bold text-lg">
            {vlad.versatil === "ataque" ? "Ataque" : vlad.versatil === "defesa" ? "Defesa" : "Desativado"}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-4 text-left">
          <span className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
            <img src="./image/morcegoV.png" alt="Transformação em Morcego" className="block w-full h-full object-cover" />
          </span>
          <h3 className="text-gray-baldurText">{anotacoesVlad[11].texto}</h3>
        </div>
        <div className="flex items-center gap-2 mt-4 text-left">
          <button
            type="button"
            onClick={() => vlad.useSkill("Névoa")}
            className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0"
          >
            <img src="./image/Nevoa.png" alt="Transformação em Névoa" className="block w-full h-full object-cover" />
          </button>
          <h3 className="text-gray-baldurText">{anotacoesVlad[12].texto}</h3>
          <span className="text-gray-baldurText font-bold text-lg">
            {vlad.nevoa === 1 ? "1" : "Gasta"}
          </span>
        </div>
      </div>
    </>
  );
}

function AlexiaProfile() {
  const info = characterInfo.Alexia;

  return (
    <>
      <div className="flex gap-4 items-center">
        <Avatar className="border-2 border-black">
          <AvatarImage src={alexiaStatus.perfil} />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <div className="w-full text-gray-baldurText text-base">
          <div className="border-b-2 border-black flex gap-10 mb-2">
            <h3>
              Nome: <span>{info.name}</span>
            </h3>
            <h3>
              Level: <span>{info.level}</span>
            </h3>
          </div>
          <div className="border-b-2 border-black flex gap-10">
            <h3>
              Classe: <span>{info.classe}</span>
            </h3>
            <h3>
              Alinhamento: <span>{info.alinhamento}</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-xl text-gray-baldurText font-extrabold mb-2">Talentos</h2>
        <div className="flex items-center gap-2 mb-4 text-left">
          <span className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
            <img src="./image/inteligenciaCATalento.png" alt="" className="block w-full h-full object-cover" />
          </span>
          <h3 className="text-gray-baldurText">{anotacoesAlexia[1].texto}</h3>
        </div>
        <div className="flex items-center gap-2 mb-4 text-left">
          <span className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
            <img src="./image/cirugiaoTalento.png" alt="" className="block w-full h-full object-cover" />
          </span>
          <h3 className="text-gray-baldurText">{anotacoesAlexia[2].texto}</h3>
        </div>
        <div className="flex items-center gap-2 text-left">
          <span className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
            <img src="./image/festaMafiaTalento.png" alt="" className="block w-full h-full object-cover" />
          </span>
          <h3 className="text-gray-baldurText">{anotacoesAlexia[3].texto}</h3>
        </div>
      </div>
    </>
  );
}

function RivenProfile() {
  const { riven } = useBattleSession();
  const info = characterInfo.Riven;

  return (
    <>
      <div className="flex gap-4 items-center">
        <Avatar className="border-2 border-black">
          <AvatarImage src={rivenStatus.perfil} />
          <AvatarFallback>RV</AvatarFallback>
        </Avatar>
        <div className="w-full text-gray-baldurText text-base">
          <div className="border-b-2 border-black flex gap-10 mb-2">
            <h3>
              Nome: <span>{info.name}</span>
            </h3>
            <h3>
              Level: <span>{info.level}</span>
            </h3>
          </div>
          <div className="border-b-2 border-black flex gap-10">
            <h3>
              Classe: <span>{info.classe}</span>
            </h3>
            <h3>
              Alinhamento: <span>{info.alinhamento}</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <h2 className="text-xl text-gray-baldurText font-extrabold mb-2">Talentos</h2>
        <div className="flex items-center gap-2 mb-4 text-left">
          <button
            type="button"
            onClick={riven.useRegeneracao}
            className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0"
          >
            <img src="./image/regeneracaoTalento.png" alt="" className="block w-full h-full object-cover" />
          </button>
          <h3 className="text-gray-baldurText">{anotacoesRiven[2].texto}</h3>
        </div>
        <div className="flex items-center gap-2 mb-4 text-left">
          <button
            type="button"
            onClick={riven.useAntiAtirador}
            className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0"
          >
            <img src="./image/antiAtiradorTalento.png" alt="" className="block w-full h-full object-cover" />
          </button>
          <h3 className="text-gray-baldurText">{anotacoesRiven[3].texto}</h3>
          <span className="text-gray-baldurText font-bold text-lg">{riven.antiAtirador}</span>
        </div>
        <div className="flex items-center gap-2 text-left">
          <button
            type="button"
            onClick={riven.useGladiador}
            className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0"
          >
            <img src="./image/duelistaTalento.png" alt="" className="block w-full h-full object-cover" />
          </button>
          <h3 className="text-gray-baldurText">{anotacoesRiven[4].texto}</h3>
        </div>
      </div>
    </>
  );
}
