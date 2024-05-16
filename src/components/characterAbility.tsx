import { useState } from "react";
import { Ability, AbilityCardProps } from "./types/Ability";
import { habilidadesAlexia, habilidadesRiven, habilidadesVlad, passivasAlexia, passivasRiven, passivasVlad } from "./data/abilityCharacters";
import { CharacterInfo } from "./types/CharacterInfo";


const AbilityCard: React.FC<AbilityCardProps> = ({ability, onClick, isSelected}) => {
    return (
        <div>
            <button onClick={onClick}>
                    <span>
                        <img src={ability.image} alt={ability.name} className={`focus:outline-none w-16 ${isSelected ? 'border-2 border-gray-300 rounded-lg transition delay-75 scale-125' : ''}`}/>
                    </span>
            </button>
        </div>
    )
}

export default function CharacterAbility({character}: {character: CharacterInfo}) { 

    

    let passivas: Ability[] = []
    let habilidades: Ability[] = []

    if (character.name === 'Vlad Alucard') {
        passivas = passivasVlad;
        habilidades = habilidadesVlad;
    } else if (character.name === 'Alexia Volier') {
        passivas = passivasAlexia;
        habilidades = habilidadesAlexia;
    } else if (character.name === 'Riven Alucard') {
        passivas = passivasRiven;
        habilidades = habilidadesRiven;
    }


    const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);

    const handleAbilityClick = (ability: Ability) => {
        setSelectedAbility(ability)
    }

    return (
       <div className="mt-20 max-w-[1750px]">
            <div className="flex justify-around w-[1750px]">
                <div>
                    <h2 className="text-4xl font-bold uppercase italic text-gray-100 mb-10">Passivas</h2>
                    <div className="flex gap-10">
                        {passivas.map((ability) => (
                            <AbilityCard 
                            key={ability.name}
                            ability={ability}
                            onClick={() => handleAbilityClick(ability)}
                            isSelected={selectedAbility?.name === ability.name}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-px bg-slate-800 py-14 my-10"></div>
                <div>
                    <h2 className="text-4xl font-bold uppercase italic text-gray-100 mb-10">Habilidades</h2>
                    <div className="flex gap-10">
                        {habilidades.map((ability) => (
                            <AbilityCard 
                            key={ability.name}
                            ability={ability}
                            onClick={() => handleAbilityClick(ability)}
                            isSelected={selectedAbility?.name === ability.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-1/2 px-28 text-gray-100">
                {selectedAbility && (
                    <div className="mt-4">
                        <h3 className="uppercase text-xl font-bold text-gray-100 mb-2">{selectedAbility.name}</h3>
                        <p className="text-gray-100">{selectedAbility.description}</p>
                        <span className="text-blue-600">{selectedAbility.mana}</span>
                        <div>{selectedAbility.table}</div>
                    </div>
                )}
            </div>
       </div>
    )
}