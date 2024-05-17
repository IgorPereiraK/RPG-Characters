import { useState } from "react";
import ButtonTurn from "../buttons/buttonTurn";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

type UpdateSkillFunction = () => void;

interface ContainerTurnProps {
    updateSkillVlad: UpdateSkillFunction
    updateSkillRiven: UpdateSkillFunction;
}

export default function ContainerTurn({ updateSkillVlad, updateSkillRiven }: ContainerTurnProps) {

    const [numberRound, setNumberRound] = useState<number>(1)

    const handleNextRound = () => {
        setNumberRound(prevRound => prevRound + 1)
        updateSkillVlad()
        updateSkillRiven()
    }

    const handlePreviousRound = () => {
        if (numberRound > 1) {
            setNumberRound(prevRound => prevRound - 1)
        }
    }

    return (
        <div className="flex justify-center items-center border-b-2 border-black">
            <ButtonTurn text="Anterior" icon={<IoMdArrowRoundBack />} onClick={handlePreviousRound}/>
            <h3 className="w-3/4 text-center text-xl font-bold">Rodada {numberRound}</h3>
            <ButtonTurn text="Próximo" icon2={<IoMdArrowRoundForward />} onClick={handleNextRound}/>
        </div>
    )
}