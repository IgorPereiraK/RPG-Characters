import React from "react";
import './CharacterInfo.css';
import CharacterGrid from "../components/charactersInfo/CharacterGrid";
import HeroSection from "../components/charactersInfo/HeroSection";

const CharacterInfo: React.FC = () => {
  return (
    <div className="character-info-bg">
      {/* Overlay de atmosfera mágica */}
      <div className="atmosphere-overlay"></div>
      <div className="magic-particles"></div>
      
      <div className="character-info-container">
        <HeroSection />
        <CharacterGrid />
      </div>
    </div>
  );
};

export default CharacterInfo;
