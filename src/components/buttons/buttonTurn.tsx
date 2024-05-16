import { ReactNode } from "react";

type ButtonProps = {
    text: string
    icon?: ReactNode
    icon2?: ReactNode
    onClick: () => void
}

export default function ButtonTurn({text, icon, icon2, onClick}: ButtonProps) {
    return (
        <button className="text-lg font-bold px-5 py-3 flex items-center text-center gap-2 rounded-2xl" onClick={onClick}>
            {icon}
            {text}
            {icon2}
        </button>
    )
}