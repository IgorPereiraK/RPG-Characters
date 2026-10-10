import ButtonTurn from "../buttons/buttonTurn";
import { IoMdArrowRoundBack, IoMdArrowRoundForward, } from "react-icons/io";

interface ContainerTurnProps {
    round: number
    onNext: () => void
    onPrev: () => void
}

export default function ContainerTurn({ round, onNext, onPrev }: ContainerTurnProps) {
    return (
        <div className="flex justify-center items-center border-b-2 border-black">
            <ButtonTurn text="Anterior" icon={<IoMdArrowRoundBack />} onClick={onPrev}/>
            <h3 className="w-3/4 text-center text-xl font-bold">Rodada {round}</h3>
            <ButtonTurn text="Próximo" icon2={<IoMdArrowRoundForward />} onClick={onNext}/>
        </div>
    )
}