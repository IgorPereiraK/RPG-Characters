import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
import { useEffect, useState } from "react";
import { rivenStatus } from "../data/characterStatus";
import SelectArmorButtonRiven from "../selectItensCharacters/selectArmorButtonRiven";
import SelectItemButtonRiven from "../selectItensCharacters/selectItemButtonRiven";
import { skillsRiven } from "../data/skillsCharacters";
import SkillBattle from "../skillBattle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatarSmall";
import { characterInfo } from "../data/characterInfo";
import { anotacoesRiven } from "../data/textoCharacters";
import ButtonProficienciaRiven from "../buttons/buttonProficienciaRiven";

interface CharacterBattleRivenProps {
    skillCharge: number;
}

export default function CharacterBattleRiven({skillCharge}: CharacterBattleRivenProps) {

    const [numberRivenHP, setNumberRivenHP] = useState<number>(rivenStatus.hp)
    const [numberRivenMP, setNumberRivenMP] = useState<number>(rivenStatus.mp)
    const [numberRivenCA, setNumberRivenCA] = useState<number>(rivenStatus.ca)
    const [incrementRiven, setIncrementRiven] = useState<number>(0);
    const [subtractRiven, setSubtractRiven] = useState<number>(0);
    const [incrementManaRiven, setIncrementManaRiven] = useState<number>(0);

    const healthPercentageRiven = (numberRivenHP / rivenStatus.hp) * 100
    const manaPercentageRiven = (numberRivenMP / rivenStatus.mp) * 100

    const handleChangeIncrementRiven = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setIncrementRiven(value);
    };

    const handleChangeSubtractRiven = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setSubtractRiven(value);
    };

    const handleChangeIncrementManaRiven = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setIncrementManaRiven(value);
    };

    const handleSubtractRiven = () => {
        const newValue = numberRivenHP - subtractRiven;
        setNumberRivenHP(newValue);
    };

    const handleIncrementRiven = () => {
        const newValue = numberRivenHP + incrementRiven;
        setNumberRivenHP(newValue);
    };

    const handleIncrementManaRiven = () => {
        const newValue = numberRivenMP + incrementManaRiven;
        setNumberRivenMP(newValue);
    };

    const [clickRivenPassiva, setClickRivenPassiva] = useState(0);
    const [buttonBorderColorRivenPassiva, setButtonBorderColorRivenPassiva] = useState("");

    const fotossintese = () => {
        const heal = Math.floor(Math.random() * 2) + 1;
        const healing = numberRivenHP + heal;
        setNumberRivenHP(healing)

        alert(`A cura gerada de 1d2 por causa da habilidade Fotossíntese foi: ${heal} de vida`)
    };

    const onipresenca = () => {
        if (clickRivenPassiva === 2) {
            alert("Passiva da Riven pronta!");
            setClickRivenPassiva(3);
            setButtonBorderColorRivenPassiva("green");
        } else if (clickRivenPassiva < 2) {
            setClickRivenPassiva(clickRivenPassiva + 1);
            setButtonBorderColorRivenPassiva("");
        } else if (clickRivenPassiva === 3) {
            setClickRivenPassiva(0);
            setButtonBorderColorRivenPassiva("");
        }
    }

    const focoDeForcaRiven = () => {
       const damage = prompt("Quanto de dano mágico você levou?")

       if (damage !== null) {
            const numeroDamage = parseFloat(damage)

            if (!isNaN(numeroDamage)) {
                const resistance = Math.floor(Math.random() * 6) + 1;

                const result = numeroDamage - resistance

                const damageResult = numberRivenHP - result

                setNumberRivenHP(damageResult)

                alert(`O dano que Riven levou foi ${numeroDamage}, mas a resistencia de Riven reduziu ${resistance} de dano que ela tomou, sendo assim o dano que Riven levou foi reduzido para ${result}.`)
            } else {
                alert("Por favor, insira um número válido.");
            }
        } else {
            alert("Operação cancelada.");
        }
      };

    const [clickRivenBloodArmor, setClickRivenBloodArmor] = useState(0);
    const [buttonBorderColorRivenBloodArmor, setButtonBorderColorRivenBloodArmor] = useState("");

    const bloodArmorRiven = () => {
        if (clickRivenBloodArmor === 1) {
        setNumberRivenCA((RivenCA) => RivenCA - 2)
        setButtonBorderColorRivenBloodArmor("")
        setClickRivenBloodArmor(0)
        } else {
        setClickRivenBloodArmor(clickRivenBloodArmor + 1);
        setNumberRivenCA((RivenCA) => RivenCA + 2)
        setButtonBorderColorRivenBloodArmor("green")
        }
    }

    const [promptCount, setPromptCount] = useState(0);

    const transfusaoSanguineaRiven = () => {
        setNumberRivenMP((RivenMP) => RivenMP - 6);
        
        setPromptCount(prevCount => {
            const nextCount = prevCount + 1
            if (nextCount === 3) {
                return 0
            }
            return nextCount
        });

        const damage = prompt("Quanto de dano Riven causou com a habilidade Transfusão Sanguínea?");

        if (damage !== null && !isNaN(parseFloat(damage))) {
            let healedAmount;
            
            if (promptCount >= 2) {
                healedAmount = parseFloat(damage);
                alert(`Essa foi a terceira vez que Riven acertou a Transfusão Sanguínea, então Riven curou ${healedAmount} de vida`)
            } else {
                healedAmount = Math.ceil(parseFloat(damage) / 2);
                alert(`Riven curou ${healedAmount} de vida`)
            }

            setNumberRivenHP(prevHP => prevHP + healedAmount);
        } else {
            alert("Por favor, insira um número válido.");
        }
    };

    const agulhaSangueRiven = () => {
        setNumberRivenMP((RivenMP) => RivenMP - 8);
    }

    const musculoTonificarAmpliar = () => {
        setNumberRivenMP((RivenMP) => RivenMP - 4);
    }

    const erupcaoPlasmatica = () => {
        setNumberRivenMP((RivenMP) => RivenMP - 7);
    }

    const trovaoContracao = () => {
        setNumberRivenMP((RivenMP) => RivenMP - 6);
    }

    const confusao = () => {
        setNumberRivenMP((RivenMP) => RivenMP - 5);
    }

    const psybean = () => {
        setNumberRivenMP((RivenMP) => RivenMP - 5);
    }

    const [clickUltRiven, setClickUltRiven] = useState(0);
    const [buttonBorderColorUltRiven, setButtonBorderColorUltRiven] = useState("");
  
    const demonBackAndCaesInfernais = () => {
        if (clickUltRiven === 4) {
            alert("Ultimente do Riven carregada!");
            setClickUltRiven(5);
            setButtonBorderColorUltRiven("green");
        } else if (clickUltRiven < 4) {
            setClickUltRiven(clickUltRiven + 1);
            setButtonBorderColorUltRiven("");
        } else if (clickUltRiven === 5) {
            setClickUltRiven(0)
            setButtonBorderColorUltRiven("")
        }
    }

    const regeneracao = () => {
        const heal = Math.floor(Math.random() * 4) + 1;
        const healing = numberRivenHP + heal;
        setNumberRivenHP(healing)

        alert(`A cura gerada de 1d4 pela habilidade Regeneração foi: ${heal} de vida`)
    };
    
    const gladiadorImortal = () => {
        const heal = Math.floor(Math.random() * 6) + 1;
        const healing = numberRivenHP + heal;
        setNumberRivenHP(healing)

        alert(`A cura gerada de 1d6 pela habilidade Gladiador Imortal foi: ${heal} de vida`)
    };

    useEffect(() => {
        if (skillCharge >= 1) {
            onipresenca();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skillCharge]);

    const [clickAntiAtiradorTalento, setClickAntiAtiradorTalento] = useState(5)

    const antiAtiradorTalento = () => {
        setClickAntiAtiradorTalento((clickAAT) => clickAAT - 1)
    }


    return (
        <div className="grid grid-cols-10 px-10 mt-20 items-end gap-1">
                <div className="col-span-1">
                <Dialog>
                        <DialogTrigger className="w-full h-full">
                            <img src={rivenStatus.perfil} alt={rivenStatus.name} className="border-2 border-black rounded-lg h-60"/>
                        </DialogTrigger>
                            <DialogContent className="bg-gray-baldurBgSecond text-gray-baldurText">
                                <DialogHeader>
                                <DialogTitle>Perfil</DialogTitle>
                                <DialogDescription className="pt-4">
                                    <div className="flex gap-4 items-center">
                                        <Avatar className="border-2 border-black">
                                            <AvatarImage src={rivenStatus.perfil}></AvatarImage>
                                            <AvatarFallback>VL</AvatarFallback>
                                        </Avatar>
                                        <div className="w-full text-gray-baldurText text-base">
                                            <div className="border-b-2 border-black flex gap-10 mb-2">
                                                <h3>Nome: <span>{characterInfo['Riven'].name}</span></h3>
                                                <h3>Level: <span>{characterInfo['Riven'].level}</span></h3>
                                            </div>
                                            <div className="border-b-2 border-black flex gap-10">
                                                <h3>Classe: <span>{characterInfo['Riven'].classe}</span></h3>
                                                <h3>Alinhamento: <span>{characterInfo['Riven'].alinhamento}</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-8">
                                        <h2 className="text-xl text-gray-baldurText font-extrabold mb-2">Talentos</h2>
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <button onClick={regeneracao} className="border-2 rounded-md border-gray-900"><img src="./image/regeneracaoTalento.png" className="w-16"/></button>
                                                <h3 className="text-gray-baldurText">{anotacoesRiven[2].texto}</h3>
                                            </div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <button onClick={antiAtiradorTalento}  className="border-2 rounded-md border-gray-900"><img src="./image/antiAtiradorTalento.png" className="w-20"/></button>
                                                <h3 className="text-gray-baldurText">{anotacoesRiven[3].texto}</h3> <span className="text-gray-baldurText font-bold text-lg">{clickAntiAtiradorTalento}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={gladiadorImortal}  className="border-2 rounded-md border-gray-900"><img src="./image/duelistaTalento.png" className="w-16"/></button>
                                                <h3 className="text-gray-baldurText">{anotacoesRiven[4].texto}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex h-24">
                    <SelectArmorButtonRiven />
                    <SelectItemButtonRiven />
                </div>
                <div className="col-span-6">
                    <div className="pb-12 text-center">
                        <input
                            id="incrementSubtract"
                            type="number"
                            value={subtractRiven}
                            onChange={handleChangeSubtractRiven}
                            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
                        />
                        <button onClick={handleSubtractRiven} className="bg-red-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText">dano</button>
                        <input
                            id="incrementInput"
                            type="number"
                            value={incrementRiven}
                            onChange={handleChangeIncrementRiven}
                            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
                        />
                        <button onClick={handleIncrementRiven} className="bg-green-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText">cura</button>
                        <input
                            id="incrementInput"
                            type="number"
                            value={incrementManaRiven}
                            onChange={handleChangeIncrementManaRiven}
                            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
                        />
                        <button onClick={handleIncrementManaRiven} className="bg-blue-600 px-2 py-1 rounded-lg font-semibold uppercase text-gray-baldurText">mana</button>
                    </div>
                    <div className="h-20 p-2 flex gap-2 mb-0.5">
                    {skillsRiven.map((skill) => (
                            <SkillBattle key={skill.name}
                                name={skill.name}
                                image={skill.image}
                                magic={skill.magic}
                                description={skill.description}
                                type={skill.type}
                                mana={skill.mana} 
                                onClick={() => {
                                    switch (skill.name) {
                                        case "Fotossíntese":
                                            fotossintese();
                                            break;
                                        case "Onipresença":
                                            onipresenca();
                                            break;
                                        case "Foco de Força":
                                            focoDeForcaRiven();
                                            break;
                                        case "Blood Armor R":
                                            bloodArmorRiven();
                                            break;
                                        case "Transfusão Sanguínea":
                                            transfusaoSanguineaRiven();
                                            break;
                                        case "Agulhas de Sangue":
                                            agulhaSangueRiven();
                                            break;
                                        case "Músculo Tonificar ou Ampliar":
                                            musculoTonificarAmpliar();
                                            break;
                                        case "Erupção Plasmática":
                                            erupcaoPlasmatica();
                                            break;
                                        case "Trovão de Contração":
                                            trovaoContracao();
                                            break;
                                        case "Confusão":
                                            confusao();
                                            break;
                                        case "Psy Bean":
                                            psybean();
                                            break;
                                        case "Cães Infernais R":
                                            demonBackAndCaesInfernais();
                                            break;
                                        case "Demon Back":
                                            demonBackAndCaesInfernais();
                                            break;
                                        default:
                                            console.log("Habilidade não encontrada!");
                                    }
                                }}
                                clickRivenPassiva={skill.name === "Onipresença" ? clickRivenPassiva : null}
                                borderColorRivenPassiva={skill.name === "Onipresença" ? buttonBorderColorRivenPassiva : null}
                                borderColorRivenBloodArmor={skill.name ==="Blood Armor R" ? buttonBorderColorRivenBloodArmor : null}
                                clickRivenUlt={skill.name ==="Cães Infernais R" || skill.name === "Demon Back" ? clickUltRiven : null}
                                borderColorRivenUlt={skill.name ==="Cães Infernais R" || skill.name === "Demon Back" ? buttonBorderColorUltRiven : null}
                                />
                        ))}
                        <div className="px-5 bg-[url('/image/escudo-ca-battle.png')] bg-cover bg-center">
                            <p className="text-black text-2xl font-bold py-4">{numberRivenCA}</p>
                        </div>
                    </div>
                    <div className="w-full h-10 border-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative">
                        <div
                        className="bg-green-500 h-full"
                        style={{ width: `${healthPercentageRiven > 100 ? 100 : healthPercentageRiven}%` }}>
                            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">{numberRivenHP}</p>
                        </div>
                    </div>
                    <div className="w-full h-10 border-x-2 border-b-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative">
                        <div
                        className="bg-blue-500 h-full"
                        style={{ width: `${manaPercentageRiven > 100 ? 100 : manaPercentageRiven}%` }}>
                            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">{numberRivenMP}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-orange-500 col-span-2">
                <div className="grid col-span-2">
                    <table className="table-auto">
                        <thead>
                            <tr className="bg-gray-baldur3 text-gray-baldurText">
                                <th className="border border-gray-baldurBorder px-4 py-2">Atributo</th>
                                <th className="border border-gray-baldurBorder px-4 py-2">Valor</th>
                                <th className="border border-gray-baldurBorder px-4 py-2">Modificador</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-baldur4 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder px-4 py-2">Força</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{rivenStatus.forcaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{rivenStatus.forcaModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur5 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder  px-4 py-2">Destreza</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{rivenStatus.destrezaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{rivenStatus.destrezaModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur4 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder px-4 py-2">Constituição</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{rivenStatus.constituicaoValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{rivenStatus.constituicaoModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur5 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder px-4 py-2">Inteligência</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{rivenStatus.inteligenciaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{rivenStatus.inteligenciaModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur4 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder px-4 py-2">Carisma</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{rivenStatus.carismaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{rivenStatus.carismaModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur5 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder px-4 py-2">Sabedoria</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{rivenStatus.sabedoriaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{rivenStatus.sabedoriaModificador}</td>
                            </tr>
                        </tbody>
                    </table>
                    <ButtonProficienciaRiven rivenStatus={rivenStatus} />
                </div>
                </div>
            </div>
    )
}