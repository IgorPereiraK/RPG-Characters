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
    alexiaStatus: any
}

export default function ButtonProficienciaAlexia({alexiaStatus}: StatusCharacter) {
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
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficiencia1}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.Modificador1}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.Modificador1 + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficiencia2}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.Modificador2}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.Modificador2 + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaAcro}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorAcro}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorAcro + parseInt(alexiaStatus.destrezaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaArca}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorArca}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorArca + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaAtle}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorAtle}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorAtle + parseInt(alexiaStatus.forcaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaAtua}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorAtua}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorAtua + parseInt(alexiaStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaEnga}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorEnga}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorEnga + parseInt(alexiaStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaFurt}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorFurt}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorFurt + parseInt(alexiaStatus.destrezaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaHist}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorHist}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorHist + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaInti}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorInti}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorInti + parseInt(alexiaStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaIntu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorIntu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorIntu + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaInve}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorInve}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorInve + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaAnim}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorAnim}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorAnim + parseInt(alexiaStatus.sabedoriaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaMedi}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorMedi}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorMedi + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaNatu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorNatu}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorNatu + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaPerc}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorPerc}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorPerc + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaPers}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorPers}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorPers + parseInt(alexiaStatus.carismaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaPres}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorPres}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorPres + parseInt(alexiaStatus.destrezaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur4 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaReli}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorReli}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorReli + parseInt(alexiaStatus.inteligenciaModificador)}</td>
                                        </tr>
                                        <tr className="bg-gray-baldur5 text-gray-baldurText">
                                            <td className="border border-gray-baldurBorder px-4 py-2">{alexiaStatus.proficienciaSobr}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">{alexiaStatus.ModificadorSobr}</td>
                                            <td className="border border-gray-baldurBorder px-4 py-2 text-center">+{alexiaStatus.ModificadorSobr + parseInt(alexiaStatus.inteligenciaModificador)}</td>
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