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
    vladStatus: any
}

export default function ButtonProficienciaVlad({vladStatus}: StatusCharacter) {
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
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaAcro}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorAcro}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorAcro + parseInt(vladStatus.destrezaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaArca}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorArca}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorArca + parseInt(vladStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaAtle}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorAtle}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorAtle + parseInt(vladStatus.forcaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaAtua}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorAtua}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorAtua + parseInt(vladStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaEnga}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorEnga}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorEnga + parseInt(vladStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaFurt}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorFurt}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorFurt + parseInt(vladStatus.destrezaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaHist}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorHist}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorHist + parseInt(vladStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaInti}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorInti}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorInti + parseInt(vladStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaIntu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorIntu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorIntu + parseInt(vladStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaInve}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorInve}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorInve + parseInt(vladStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaAnim}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorAnim}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorAnim + parseInt(vladStatus.sabedoriaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaMedi}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorMedi}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorMedi + parseInt(vladStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaNatu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorNatu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorNatu + parseInt(vladStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaPerc}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorPerc}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorPerc + parseInt(vladStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaPers}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorPers}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorPers + parseInt(vladStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaPres}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorPres}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorPres + parseInt(vladStatus.destrezaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaReli}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorReli}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorReli + parseInt(vladStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{vladStatus.proficienciaSobr}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{vladStatus.ModificadorSobr}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{vladStatus.ModificadorSobr + parseInt(vladStatus.inteligenciaModificador)}</td>
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