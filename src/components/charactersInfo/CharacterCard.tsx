import React from 'react';

interface CharacterCardProps {
  id: string;
  name: string;
  class: string;
  image: string;
  description: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  id,
  name,
  class: characterClass,
  image,
  description
}) => {
  return (
    <div className={`character-card ${id}-card`}>
      <div className="character-image-container">
        <img 
          src={image} 
          alt={name} 
          className="character-image"
        />
      </div>
      
      <div className="character-info">
        <h3 className="character-name">{name}</h3>
        <p className="character-class">{characterClass}</p>
        <p className="character-description">{description}</p>
        
        <button className="character-btn">
          Ver Detalhes
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;