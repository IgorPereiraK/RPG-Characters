import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterGrid: React.FC = () => {
  const characters = [
    {
      id: 'vlad',
      name: 'Vlad Alucard',
      class: 'Hemomante',
      image: '/image/Vlad-Alucard.jpg',
      description: 'Ex-caçador de monstros transformado em vampiro. Mestre da hemomancia e combate corpo-a-corpo.',
      bgColor: '#e53935'
    },
    {
      id: 'alexia',
      name: 'Alexia Volier',
      class: 'Tecnomante',
      image: '/image/Alexia.png',
      description: 'Vampira especialista em tecnologia e armas de fogo. Combina magia e ciência.',
      bgColor: '#1e88e5'
    },
    {
      id: 'riven',
      name: 'Riven Alucard',
      class: 'Druida e Hemomante',
      image: '/image/Riven.png',
      description: 'Clone vampiro com poderes da natureza. Híbrida de magia arcana e primal.',
      bgColor: '#43a047'
    }
  ];

  return (
    <div className="character-grid">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          id={character.id}
          name={character.name}
          class={character.class}
          image={character.image}
          description={character.description}
          bgColor={character.bgColor}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;