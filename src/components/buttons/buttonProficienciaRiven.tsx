/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"

type StatusCharacter = {
    rivenStatus: any
}

export default function ButtonProficienciaRiven({rivenStatus}: StatusCharacter) {
    return (
        <button className="bg-gray-baldur4 border-gray-baldurBorder py-2 text-center text-gray-baldurText border-x border-b">
                        <Dialog>
                            <DialogTrigger className="w-full">
                            <h3>Proficiência</h3>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-baldurBgSecond text-gray-baldurText">
                                <DialogHeader>
                                <DialogTitle>Suas Proficiência</DialogTitle>
                                <DialogDescription className="mx-auto">
                                <table className="table-auto mt-10 w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-gray-baldurText border-gray-baldurBorder bg-gray-baldur3 border text-center">Proficiências</th>
                                            <th className="px-4 py-2 text-gray-baldurText border-gray-baldurBorder bg-gray-baldur3 border text-center">Modificador</th>
                                            <th className="px-4 py-2 text-gray-baldurText border-gray-baldurBorder bg-gray-baldur3 border text-center">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficiencia1}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.Modificador1}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.Modificador1 + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficiencia2}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.Modificador2}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.Modificador2 + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficiencia3}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.Modificador3}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.Modificador3 + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficiencia4}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.Modificador4}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.Modificador4 + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaAcro}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorAcro}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorAcro + parseInt(rivenStatus.destrezaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaArca}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorArca}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorArca + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaAtle}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorAtle}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorAtle + parseInt(rivenStatus.forcaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaAtua}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorAtua}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorAtua + parseInt(rivenStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaEnga}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorEnga}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorEnga + parseInt(rivenStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaFurt}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorFurt}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorFurt + parseInt(rivenStatus.destrezaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaHist}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorHist}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorHist + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaInti}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorInti}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorInti + parseInt(rivenStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaIntu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorIntu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorIntu + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaInve}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorInve}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorInve + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaAnim}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorAnim}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorAnim + parseInt(rivenStatus.sabedoriaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaMedi}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorMedi}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorMedi + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaNatu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorNatu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorNatu + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaPerc}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorPerc}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorPerc + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaPers}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorPers}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorPers + parseInt(rivenStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaPres}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorPres}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorPres + parseInt(rivenStatus.destrezaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaReli}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorReli}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorReli + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{rivenStatus.proficienciaSobr}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{rivenStatus.ModificadorSobr}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{rivenStatus.ModificadorSobr + parseInt(rivenStatus.inteligenciaModificador)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </button>
    )
}