/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import StatusCard from "./statusCard"
import CharacterAbility from "./characterAbility"
import ContainerInventory from "./container/containerInventory"
import ContainerAnotação from "./container/containerAnotacao"
import CharacterCardVlad from "./charactersCards/characterCardVlad"
import CharacterCardAlexia from "./charactersCards/characterCardAlexia"
import CharacterCardRiven from "./charactersCards/characterCardRiven"
import { CharacterInfo } from "./types/CharacterInfo"

type PageInfosProps = {
    character: CharacterInfo
}

type NavbarItem = {
    id: string
    label: string
    activeIcon: string
    inactiveIcon: string
    content: React.ReactNode
}



export default function PageInfos({character}: PageInfosProps) {

    const items: NavbarItem[] = [
        {
            id: 'status',
            label: 'STATUS',
            activeIcon: "/image/marca.png",
            inactiveIcon: "/image/marca-white.png",
            content: <div className="flex justify-center items-center px-24">
                <div className="">
                    {character.name === 'Vlad Alucard' && <CharacterCardVlad />}
                    {character.name === 'Alexia Volier' && <CharacterCardAlexia />}
                    {character.name === 'Riven Alucard' && <CharacterCardRiven />}
                </div>
                <div>
                    <StatusCard character={character}/>
                </div>
            </div>
        },
        {
            id: 'habilidades',
            label: 'HABILIDADES',
            activeIcon: "/image/marca.png",
            inactiveIcon: "/image/marca-white.png",
            content: <div>
                <CharacterAbility character={character}/>
            </div>
        },
        {
            id: 'inventario',
            label: 'INVENTARÍO',
            activeIcon: "/image/marca.png",
            inactiveIcon: "/image/marca-white.png",
            content: <div>
                <ContainerInventory character={character}/>
            </div>
        },
        {
            id: 'anotacoes',
            label: 'ANOTAÇÕES',
            activeIcon: "/image/marca.png",
            inactiveIcon: "/image/marca-white.png",
            content: <div className="w-full">
                    <ContainerAnotação character={character}/>
                </div>
        }
    ]

    const [activeItem, setActiveItem] = useState<NavbarItem | null>(null);

    useEffect(() => {
        setActiveItem(items[0]);
    }, [character]);


    return (
        <div className="relative h-screen">
            <img src={(activeItem?.id === 'status' || activeItem?.id === 'anotacoes') ?
        (
            character.name === 'Vlad Alucard' ? '/image/background-1.jpg' :
            character.name === 'Alexia Volier' ? '/image/background-8.jpg' :
            character.name === 'Riven Alucard' ? '/image/background-12.jpg' :
            ''
        ) :
        ''}
                alt="background" className="bgDesfoco2"
             />
            <section className=" h-screen flex-col p-4">
                <nav className="text-white flex justify-center bg-black w-[90%] rounded-lg">
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={`flex items-center py-2 px-6 ml-4 text-lg font-bold font-sans cursor-pointer border-b-2 border-transparent transition delay-150 hover:border-b-red-600 focus:outline-none ${
                            activeItem?.id === item.id ? 'text-red-600' : ''
                        }`}
                        onClick={() => setActiveItem(item)}
                    >
                        <img src={activeItem?.id === item.id ? item.activeIcon : item.inactiveIcon} alt="marca" className="w-7 h-7 mr-2"/>
                        {item.label}
                    </button>
                ))}
                </nav>
                <div className="text-white flex p-10">
                    {activeItem?.content}
                </div>
            </section>
        </div>
    )
}