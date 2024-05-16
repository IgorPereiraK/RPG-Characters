import { CharacterInfo } from "./types/CharacterInfo"


type StatusCardProps = {
    character: CharacterInfo
}


export default function StatusCard({character}: StatusCardProps) {
    return (
        <div className="relative px-20 text-white w-[1100px] overflow-hidden h-[600px] ">
        
        <div className="relative z-20">
          <div className="flex justify-between items-center mb-24 mt-10">
            <div className="">
                <h2 className="text-4xl font-bold">{character.name}</h2>
                <div className="flex gap-3 text-2xl font-medium">
                    <h4>HP: <span>{character.hp}</span></h4>
                    <h4>MP: <span>{character.mp}</span></h4>
                </div>
            </div>
            <div className="text-2xl font-medium">
                <h4>Level: {character.level}</h4>
                <h4>Alinhamento: {character.alinhamento}</h4>
            </div>
            <div className="bg-[url('/image/escudo-ca.png')] bg-cover bg-center w-20 h-20">
                <p className="mt-2 px-6 py-4 text-black text-3xl font-semibold">{character.ca}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
           <div className="grid col-end-1">
           <div className="">
           <table className="table-auto text-center">
                <thead>
                    <tr className="bg-slate-700 text-gray-100">
                        <th className="border px-16 py-1 ">Raça</th>
                        <th className="border px-16 py-1 ">Classe</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-800 text-gray-100">
                        <td className="border px-4 py-2 ">{character.raca}</td>
                        <td className="border px-4 py-2 ">{character.classe}</td>
                    </tr>
                    <tr className="bg-gray-600 text-gray-100">
                        <td className="border px-14 py-2 "><img src={character.imageRaca} alt={character.name} className="w-12 h-12"/></td>
                        <td className="border px-16 py-2 "><img src={character.imageClasse} alt={character.name} className="w-12 h-12"/></td>
                    </tr>
                </tbody>
            </table>
            </div>
            <table className="table-auto mt-16">
                <thead>
                    <tr>
                        <th className="pl-36 text-gray-100  bg-slate-700 border-y border-l">Profic</th>
                         <th className="pr-36 text-gray-100  bg-slate-700 border-y border-r">iência</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-800 text-gray-100">
                        <td className="border px-4 py-2 text-center">{character.proficiencia1}</td>
                        <td className="border px-4 py-2 text-center">{character.proficiencia2}</td>
                    </tr>
                    <tr className="bg-gray-600 text-gray-100">
                        <td className="border px-4 py-2 text-center">{character.proficiencia3}</td>
                        <td className="border px-4 py-2 text-center">{character.proficiencia4}</td>
                    </tr>
                    {character.name === 'Riven Alucard' && (
                        <tr className="bg-gray-800 text-gray-100">
                            <td className="border px-4 py-2 text-center">{character.proficiencia5}</td>
                            <td className="border px-4 py-2 text-center">{character.proficiencia6}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
           </div>
            <div className="grid col-span-2">
                <table className="table-auto">
                    <thead>
                        <tr className="bg-slate-700 text-gray-100">
                            <th className="border px-4 py-2">Atributo</th>
                            <th className="border px-4 py-2">Valor</th>
                            <th className="border px-4 py-2">Modificador</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-800 text-gray-100">
                            <td className="border px-4 py-2">Força</td>
                            <td className="border px-8 py-2 text-center">{character.forcaValor}</td>
                            <td className="border px-12 py-2 text-center">{character.forcaModificador}</td>
                        </tr>
                        <tr className="bg-gray-600 text-gray-100">
                            <td className="border px-4 py-2">Destreza</td>
                            <td className="border px-8 py-2 text-center">{character.destrezaValor}</td>
                            <td className="border px-12 py-2 text-center">{character.destrezaModificador}</td>
                        </tr>
                        <tr className="bg-gray-800 text-gray-100">
                            <td className="border px-4 py-2">Constituição</td>
                            <td className="border px-8 py-2 text-center">{character.constituicaoValor}</td>
                            <td className="border px-12 py-2 text-center">{character.constituicaoModificador}</td>
                        </tr>
                        <tr className="bg-gray-600 text-gray-100">
                            <td className="border px-4 py-2">Inteligência</td>
                            <td className="border px-8 py-2 text-center">{character.inteligenciaValor}</td>
                            <td className="border px-12 py-2 text-center">{character.inteligenciaModificador}</td>
                        </tr>
                        <tr className="bg-gray-800 text-gray-100">
                            <td className="border px-4 py-2">Carisma</td>
                            <td className="border px-8 py-2 text-center">{character.carismaValor}</td>
                            <td className="border px-12 py-2 text-center">{character.carismaModificador}</td>
                        </tr>
                        <tr className="bg-gray-600 text-gray-100">
                            <td className="border px-4 py-2">Sabedoria</td>
                            <td className="border px-8 py-2 text-center">{character.sabedoriaValor}</td>
                            <td className="border px-12 py-2 text-center">{character.sabedoriaModificador}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    )
}