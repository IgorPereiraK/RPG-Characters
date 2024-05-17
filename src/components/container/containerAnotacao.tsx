import BoxAnotação from "./boxAnotacao";
import { anotacoesAlexia, anotacoesRiven, anotacoesVlad } from "../data/textoCharacters";
import { CharacterInfo } from "../types/CharacterInfo";
import { Texto } from "../types/Texto";


export default function ContainerAnotação({character}: {character: CharacterInfo}) {

   

    let anotacao: Texto[] = []

    if(character.name === 'Vlad Alucard') {
        anotacao = anotacoesVlad
    } else if (character.name === 'Alexia Volier') {
        anotacao = anotacoesAlexia
    } else if (character.name === 'Riven Alucard') {
        anotacao = anotacoesRiven
    }


    return (
        <div className="flex justify-center w-full">
            <div className="w-2/4 font-sans">
                {anotacao.map((anotacao, index) => (
                    <BoxAnotação key={index} {...anotacao} />
                ))}
            </div>
        </div>
    )
}