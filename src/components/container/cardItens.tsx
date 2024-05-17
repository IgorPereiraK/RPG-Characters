import { Item } from "../types/Item";

export default function CardItens({name, imagem, texto, dano} : Item) {
    return (
        <div className="bg-gray-100 h-[410px] w-60 border-2 border-amber-300 overflow-hidden">
            <img src={imagem} alt={name} className="w-full h-44"/>
            <div className="border-y-2 border-amber-300 py-2 text-center text-gray-950 font-Mate text-2xl">
                <p>{name}</p>
                <p className="text-sm font-sans">{dano}</p>
            </div>
            <div className="text-gray-950 px-4 py-4 font-El-Messiri italic text-lg overflow-y-auto max-h-[178px] h-full w-full bg-[url('/image/background-card.avif')] bg-cover bg-center">
                <p>{texto}</p>
            </div>
        </div>
    )
}