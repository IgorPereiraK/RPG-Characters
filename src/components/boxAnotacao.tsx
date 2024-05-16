import { Texto } from "./types/Texto";

export default function BoxAnotação({texto} : Texto) {
    return (
        <ul className="">
            <li className="border-2 border-gray-500 rounded-md py-3 mb-6 bg-gray-200 text-black">
                <p className="ml-2">{texto}</p>
            </li>
        </ul>
    )
}