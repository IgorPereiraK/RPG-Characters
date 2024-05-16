
import CardItens from "./cardItens";
import { acessoriosAlexia, acessoriosRiven, acessoriosVlad, armasEArmadurasAlexia, armasEArmadurasRiven, armasEArmadurasVlad, itensAlexia, itensRiven, itensVlad } from "./data/itensCharacters";
import { CharacterInfo } from "./types/CharacterInfo";
import { Item } from "./types/Item";

export default function ContainerInventory({character}: {character: CharacterInfo}) {

    let armasEArmaduras: Item[] = []
    let acessorios: Item[] = []
    let itens: Item[] = []

    if (character.name === 'Vlad Alucard') {
        armasEArmaduras = armasEArmadurasVlad
        acessorios = acessoriosVlad
        itens = itensVlad
    } else if (character.name === 'Alexia Volier') {
        armasEArmaduras = armasEArmadurasAlexia
        acessorios = acessoriosAlexia
        itens = itensAlexia
    } else if (character.name === 'Riven Alucard') {
        armasEArmaduras = armasEArmadurasRiven
        acessorios = acessoriosRiven
        itens = itensRiven
    }

    return (
        <div className="grid grid-cols-2 gap-x-24 gap-y-10">
            <div className="grid grid-cols-3 items-center gap-4">
                <h4 className="bg-black py-1 text-xl font-bold col-span-3 text-center rounded-lg uppercase">Armas e Armaduras</h4>
                {armasEArmaduras.map((item, index) => (
                    <CardItens key={index} {...item} />
                ))}
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
                <h4 className="bg-black py-1 text-xl font-bold col-span-3 text-center rounded-lg uppercase">Acessórios</h4>
                {acessorios.map((item, index) => (
                    <CardItens key={index} {...item} />
                ))}
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
                <h4 className="bg-black py-1 text-xl font-bold col-span-3 text-center rounded-lg uppercase">Itens</h4>
                {itens.map((item, index) => (
                    <CardItens key={index} {...item} />
                ))}
            </div>
        </div>
    )
}