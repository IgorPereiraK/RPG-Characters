import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { armorDeVlad } from "../data/armorBattleCharacters";

export default function SelectArmorButton() {
  const [selectedArmorIndex, setSelectedArmorIndex] = useState(0);

  const handleSelectedArmor = (index: number) => {
    setSelectedArmorIndex(index);
  };

  return (
    <button className="">
      <Dialog>
        <DialogTrigger className="w-[91px]">
          <img
            src={armorDeVlad[selectedArmorIndex].imagem}
            alt={armorDeVlad[selectedArmorIndex].name}
            className="h-24 border-y-2 border-x-2 border-black w-full"
          />
        </DialogTrigger>
        <DialogContent className="bg-gray-baldurBgSecond text-gray-baldurText">
          <DialogHeader>
            <DialogTitle>Escolha a sua Armadura de Combate</DialogTitle>
            <DialogDescription>
              <div className="w-full py-4 mt-4">
                <div className="grid grid-cols-3 gap-6 px-6 cursor-pointer">
                  {armorDeVlad.map((arma, index) => (
                    <div key={index} onClick={() => handleSelectedArmor(index)}>
                      <img
                        src={arma.imagem}
                        alt={arma.name}
                        className="h-32 w-28 border-2 border-black"
                      />
                    </div>
                  ))}
                </div>
                <div className=" mt-6 border-t-2 border-black grid grid-cols-1 gap-4 py-4 px-6">
                  {selectedArmorIndex !== null && (
                    <div>
                      <div className="flex gap-4">
                        <img
                          src={armorDeVlad[selectedArmorIndex].imagem}
                          alt={armorDeVlad[selectedArmorIndex].name}
                          className="h-32 w-28"
                        />
                        <div>
                          <h3 className="text-2xl text-gray-100 font-bold mb-1">
                            {armorDeVlad[selectedArmorIndex].name}
                          </h3>
                          <p className="text-xl text-gray-100">
                            {armorDeVlad[selectedArmorIndex].dano}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-baldurText text-lg mt-4">
                        {armorDeVlad[selectedArmorIndex].texto}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </button>
  );
}
