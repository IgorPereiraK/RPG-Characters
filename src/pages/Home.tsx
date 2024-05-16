'use client'
import { Link } from "react-router-dom";
// import ButtonBattle from "@/components/button-battle";
import PageInfos from "../components/pageInfos";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useState, useEffect } from "react";
import { characterInfo } from "../components/data/characterInfo";

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<string>('Vlad');
  const [animationStarted, setAnimationStarted] = useState<boolean>(false);

  const handleCharacterClick = (characterName: string) => {
    setSelectedCharacter(characterName);
  };

  useEffect(() => {

    if (animationStarted) {
      const elements = document.querySelectorAll('.animate-fadeIn');
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.classList.remove('animate-[fadeIn]');
        void element.offsetWidth;
        element.classList.add('animate-[fadeIn]');
      }
    });
    const elements2 = document.querySelectorAll('.animate-fadeInDown');
    elements2.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.classList.remove('animate-[fadeInDown]');
        void element.offsetWidth; 
        element.classList.add('animate-[fadeInDown]');
      }
    });
    const elements3 = document.querySelectorAll('.animate-fadeInLeft');
    elements3.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.classList.remove('animate-[fadeInLeft]');
        void element.offsetWidth;
        element.classList.add('animate-[fadeInLeft]');
      }
    });
    } else {

      setAnimationStarted(true);
    }
  }, [selectedCharacter, animationStarted]);

  const { image, name, text } = characterInfo[selectedCharacter];

  return (
    <div>
      <main className="relative overflow-hidden">
        <div className="h-screen relative">
          <img className="h-full w-full" src={image} alt="Vlad" />
          <div className="absolute flex flex-col justify-center ml-32 z-10 inset-0 max-w-96">
            <img className={`w-60 h-24 mb-8 animate-fadeIn  duration-3000 ${animationStarted ? '' : 'invisible'}`} src="/image/logo-alucard.png" alt={name} />
            <h2 className={`text-gray-50 text-5xl font-bold mb-5 animate-fadeInDown duration-1500 ${animationStarted ? '' : 'invisible'}`}>{name}</h2>
            <p className={`text-gray-50 text-base leading-6 animate-fadeInLeft duration-1500 ${animationStarted ? '' : 'invisible'}`}>{text}</p>
          </div>
          <div className="absolute inset-0" style={{ width: '80vw', minHeight: '100vh' }}>
            <div className="bg-gradient-to-r from-black to-transparent w-full h-full" />
          </div>
        </div>
      </main>
      <PageInfos character={characterInfo[selectedCharacter]} />
      <ul className="fixed top-0 right-0 flex flex-col gap-4 justify-center items-center w-44 h-screen" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
        {Object.keys(characterInfo).map((characterName) => (
          <li key={characterName}>
            <button className={`cursor-pointer rounded-full focus:outline-none ${
              selectedCharacter === characterName ? 'scale-[1.2] shadow-[0_0px_20px_#ef4444]' : 'hover:scale-105 hover:shadow-[0_0px_12px_#f87171]'
            }`} onClick={() => handleCharacterClick(characterName)}>
              <Avatar>
                <AvatarImage src={characterInfo[characterName].perfil} />
                <AvatarFallback>{characterName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </button>
          </li>
        ))}
        <div className="absolute bottom-8">
            <Link to="/battleSimulator" target="_blank">
                <button className="px-2 hover:scale-110">
                    <img src="./image/icon-battle.png" alt="battle icon"/>
                </button>
            </Link>
        </div>
      </ul>
    </div>
  );
}
