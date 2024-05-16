import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
import { useState } from "react"
import { armasDeAlexia } from "../data/itensBattleCharacters"


export default function SelectItemButtonAlexia() {
    
    const [selectedArmaIndex, setSelectedArmaIndex] = useState(0)

    const handleSelectedArma = (index: number) => {
        setSelectedArmaIndex(index)
    }

    return (
        <button className="">
                    <Dialog>
                        <DialogTrigger className="w-[91px]">
                           <img src={armasDeAlexia[selectedArmaIndex].imagem} alt={armasDeAlexia[selectedArmaIndex].name} className="h-24 border-y-2 border-x-2 border-black w-full"/>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-baldurBgSecond text-gray-baldurText">
                            <DialogHeader>
                            <DialogTitle>Escolha a sua Arma de Combate</DialogTitle>
                            <DialogDescription>
                                <div className="w-full py-4 mt-4">
                                    <div className="grid grid-cols-3 gap-6 px-6 cursor-pointer">
                                        {armasDeAlexia.map((arma, index) => (
                                            <div key={index} onClick={() => handleSelectedArma(index)}>
                                                <img src={arma.imagem} alt={arma.name} className="h-24 w-28 border-2 border-black"/>
                                            </div>
                                        ))}
                                    </div>
                                    <div className=" mt-6 border-t-2 border-gray-baldurBorder grid grid-cols-1 gap-4 py-4 px-6">
                                        {selectedArmaIndex !== null && (
                                            <div>
                                                <div className="flex gap-4">
                                                    <img src={armasDeAlexia[selectedArmaIndex].imagem} alt={armasDeAlexia[selectedArmaIndex].name} className="h-24 w-28"/>
                                                    <div>
                                                        <h3 className="text-2xl text-gray-100 font-bold mb-1">{armasDeAlexia[selectedArmaIndex].name}</h3>
                                                        <p className="text-xl text-gray-100">{armasDeAlexia[selectedArmaIndex].dano}</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-baldurText text-lg mt-4">{armasDeAlexia[selectedArmaIndex].texto}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </button>
    )
}