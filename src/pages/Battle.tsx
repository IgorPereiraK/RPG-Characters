import { useState } from "react";
import CharacterBattleAlexia from "../components/charactersBattle/characterBattleAlexia";
import CharacterBattleRiven from "../components/charactersBattle/characterBattleRiven";
import CharacterBattleVlad from "../components/charactersBattle/characterbattleVlad";
import ContainerTurn from "../components/container/containerTurn";

export default function Battle() {
    const [vladSkillCharge, setVladSkillCharge] = useState<number>(0);
    const [rivenSkillCharge, setRivenSkillCharge] = useState<number>(0);
    
    const updateVladSkillCharge = () => {
        setVladSkillCharge(charge => charge + 1);
    };

    const updateRivenSkillCharge = () => {
        setRivenSkillCharge(charge => charge + 1);
    };


    return (
        <div className="bg-gray-baldurBg h-[1400px] text-gray-baldurText">
            <ContainerTurn updateSkillVlad={updateVladSkillCharge} updateSkillRiven={updateRivenSkillCharge}/>
            <CharacterBattleVlad skillCharge={vladSkillCharge}/>
            <CharacterBattleAlexia />
            <CharacterBattleRiven skillCharge={rivenSkillCharge}/>
        </div>
    )
}