import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"

import SkillBattle from "./skillBattle"
import { skillsVlad } from "./data/skillsCharacters"
import { vladStatus } from "./data/characterStatus"
import SelectItemButton from "./selectItensCharacters/selectItemButton"
import { useEffect, useState } from "react"
import SelectArmorButton from "./selectItensCharacters/selectArmorButton"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatarSmall"
import { characterInfo } from "./data/characterInfo"
import { anotacoesVlad } from "./data/textoCharacters"
import ButtonProficienciaVlad from "./buttons/buttonProficienciaVlad"
  
interface CharacterBattleVladProps {
    skillCharge: number;
}

export default function CharacterBattleVlad({skillCharge}: CharacterBattleVladProps) {

    const [numberVladHP, setNumberVladHP] = useState<number>(vladStatus.hp)
    const [numberVladMP, setNumberVladMP] = useState<number>(vladStatus.mp)
    const [numberVladCA, setNumberVladCA] = useState<number>(vladStatus.ca)
    const [incrementVlad, setIncrementVlad] = useState<number>(0);
    const [subtractVlad, setSubtractVlad] = useState<number>(0);
    const [incrementManaVlad, setIncrementManaVlad] = useState<number>(0);

    const healthPercentageVlad = (numberVladHP / vladStatus.hp) * 100
    const manaPercentageVlad = (numberVladMP / vladStatus.mp) * 100

    const handleChangeIncrementVlad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setIncrementVlad(value);
    };

    const handleChangeSubtractVlad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setSubtractVlad(value);
    };

    const handleChangeIncrementManaVlad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setIncrementManaVlad(value);
    };

    const handleSubtractVlad = () => {
        const newValue = numberVladHP - subtractVlad;
        setNumberVladHP(newValue);
    };

    const handleIncrementVlad = () => {
        const newValue = numberVladHP + incrementVlad;
        setNumberVladHP(newValue);
    };

    const handleIncrementManaVlad = () => {
        const newValue = numberVladMP + incrementManaVlad;
        setNumberVladMP(newValue);
      };

    const [clickVladPassiva, setClickVladPassiva] = useState(0);
    const [buttonBorderColorVladPassiva, setButtonBorderColorVladPassiva] = useState("");


    const sangueDeFerro = () => {
        if (clickVladPassiva === 2) {
            alert("Passiva do Vlad pronta!");
            setClickVladPassiva(3);
            setButtonBorderColorVladPassiva("red");
        } else if (clickVladPassiva < 2) {
            setClickVladPassiva(clickVladPassiva + 1);
            setButtonBorderColorVladPassiva("");
        } else if (clickVladPassiva === 3) {
            setClickVladPassiva(0);
            setButtonBorderColorVladPassiva("");
        }
    }

    useEffect(() => {
        if (skillCharge >= 1) {
            sangueDeFerro();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skillCharge]);
    

    const focoDeForca = () => {
        const damage = prompt("Quanto de dano mágico você levou?")

        if (damage !== null) {
            const numeroDamage = parseFloat(damage)

            if (!isNaN(numeroDamage)) {
                const resistance = Math.floor(Math.random() * 6) + 1;

                const result = numeroDamage - resistance

                const damageResult = numberVladHP - result

                setNumberVladHP(damageResult)

                alert(`O dano que Vlad levou foi ${numeroDamage}, mas a resistencia de Vlad reduziu ${resistance} de dano que ela tomou, sendo assim o dano que Vlad levou foi reduzido para ${result}.`)
            } else {
                alert("Por favor, insira um número válido.");
            }
        } else {
            alert("Operação cancelada.");
        }
    };

    const regeneracao = () => {
        const heal = Math.floor(Math.random() * 4) + 1;
        const healing = numberVladHP + heal;
        setNumberVladHP(healing)

        alert(`A cura gerada de 1d4 pela habilidade Regeneração foi: ${heal} de vida`)
    };
    
    const gladiadorImortal = () => {
        const heal = Math.floor(Math.random() * 6) + 1;
        const healing = numberVladHP + heal;
        setNumberVladHP(healing)

        alert(`A cura gerada de 1d6 pela habilidade Gladiador Imortal foi: ${heal} de vida`)
    };

    const [clickVladBloodArmor, setClickVladBloodArmor] = useState(0);
    const [buttonBorderColorVladBloodArmor, setButtonBorderColorVladBloodArmor] = useState("");

    const bloodArmor = () => {
        if (clickVladBloodArmor === 1) {
        setNumberVladCA((vladCA) => vladCA - 2)
        setButtonBorderColorVladBloodArmor("")
        setClickVladBloodArmor(0)
        } else {
        setClickVladBloodArmor(clickVladBloodArmor + 1);
        setNumberVladCA((VladCA) => VladCA + 2)
        setButtonBorderColorVladBloodArmor("red")
        }
    }

    const [clickVladBloodShield, setClickVladBloodShield] = useState(0);
    const [buttonBorderColorVladBloodShield, setButtonBorderColorVladBloodShield] = useState("");

    const bloodShield = () => {
        if (clickVladBloodShield === 1) {
        setNumberVladCA((vladCA) => vladCA - 2)
        setButtonBorderColorVladBloodShield("")
        setClickVladBloodShield(0)
        } else {
        setClickVladBloodShield(clickVladBloodShield + 1);
        setNumberVladCA((VladCA) => VladCA + 2)
        setButtonBorderColorVladBloodShield("red")
        }
    };

    const [promptCount, setPromptCount] = useState(0);

    const transfusaoSanguinea = () => {
        setNumberVladMP((vladMP) => vladMP - 6);
        
        setPromptCount(prevCount => {
            const nextCount = prevCount + 1
            if (nextCount === 3) {
                return 0
            }
            return nextCount
        });

        const damage = prompt("Quanto de dano Vlad causou com a habilidade Transfusão Sanguínea?");

        if (damage !== null && !isNaN(parseFloat(damage))) {
            let healedAmount;
            
            if (promptCount >= 2) {
                healedAmount = parseFloat(damage);
                alert(`Essa foi a terceira vez que Vlad acertou a Transfusão Sanguínea, então Vlad curou ${healedAmount} de vida`)
            } else {
                healedAmount = Math.ceil(parseFloat(damage) / 2);
                alert(`Vlad curou ${healedAmount} de vida`)
            }

            setNumberVladHP(prevHP => prevHP + healedAmount);
        } else {
            alert("Por favor, insira um número válido.");
        }
    };

    const reflexoSanguineoVlad = () => {
        setNumberVladMP((vladMP) => vladMP - 6);
    }

    const agulhaSangueVlad = () => {
        setNumberVladMP((vladMP) => vladMP - 8);
    }

    const pinguinsVlad = () => {
        setNumberVladMP((vladMP) => vladMP - 6);
    }

    const [clickUltVlad, setClickUltVlad] = useState(0);
    const [buttonBorderColorUltVlad, setButtonBorderColorUltVlad] = useState("");

    const caesInfernais = () => {
        if (clickUltVlad === 4) {
            alert("Ultimente do Vlad carregada!");
            setClickUltVlad(5);
            setButtonBorderColorUltVlad("red");
          } else if (clickUltVlad < 4) {
            setClickUltVlad(clickUltVlad + 1);
            setButtonBorderColorUltVlad("");
          } else if (clickUltVlad === 5) {
            setClickUltVlad(0)
            setButtonBorderColorUltVlad("")
          }
    }

    const [clickAntiAtiradorTalento, setClickAntiAtiradorTalento] = useState(5)

    const antiAtiradorTalento = () => {
        if (clickAntiAtiradorTalento > 0) {
            setClickAntiAtiradorTalento((clickAAT) => clickAAT - 1)
        }
    }

    return (
        <div>
            <div className="grid grid-cols-10 px-10 mt-14 items-end gap-1">
                <div className="col-span-1">
                    <Dialog>
                            <DialogTrigger className="w-full">
                            <img src={vladStatus.perfil} alt={vladStatus.name} className="border-2 border-black rounded-lg"/>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-baldurBgSecond text-gray-baldurText">
                                <DialogHeader>
                                <DialogTitle>Perfil</DialogTitle>
                                <DialogDescription className="pt-4">
                                    <div className="flex gap-4 items-center">
                                        <Avatar className="border-2 border-black">
                                            <AvatarImage src={vladStatus.perfil}></AvatarImage>
                                            <AvatarFallback>VL</AvatarFallback>
                                        </Avatar>
                                        <div className="w-full text-gray-baldurText text-base">
                                            <div className="border-b-2 border-black flex gap-10 mb-2">
                                                <h3>Nome: <span>{characterInfo['Vlad'].name}</span></h3>
                                                <h3>Level: <span>{characterInfo['Vlad'].level}</span></h3>
                                            </div>
                                            <div className="border-b-2 border-black flex gap-10">
                                                <h3>Classe: <span>{characterInfo['Vlad'].classe}</span></h3>
                                                <h3>Alinhamento: <span>{characterInfo['Vlad'].alinhamento}</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-8">
                                        <h2 className="text-xl text-gray-baldurText font-extrabold mb-2">Talentos</h2>
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <button  className="border-2 rounded-md border-gray-900"><img src="./image/regeneracaoTalento.png" className="w-16 h-12"/></button>
                                                <h3 className="text-gray-baldurText">{anotacoesVlad[7].texto}</h3>
                                            </div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <button onClick={antiAtiradorTalento}  className="border-2 rounded-md border-gray-900"><img src="./image/antiAtiradorTalento.png" className="w-20 h-12"/></button>
                                                <h3 className="text-gray-baldurText">{anotacoesVlad[8].texto}</h3> <span className="text-gray-baldurText font-bold text-lg">{clickAntiAtiradorTalento}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button  className="border-2 rounded-md border-gray-900"><img src="./image/duelistaVlad.png" className="w-16 h-12"/></button>
                                                <h3 className="text-gray-baldurText">{anotacoesVlad[9].texto}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                </div>
                <div className="flex h-24">
                    <SelectArmorButton />
                    <SelectItemButton />
                </div>
                <div className="col-span-6">
                    <div className="pb-12 text-center">
                        <input
                            id="incrementSubtract"
                            type="number"
                            value={subtractVlad}
                            onChange={handleChangeSubtractVlad}
                            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
                        />
                        <button onClick={handleSubtractVlad} className="bg-red-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText">dano</button>
                        <input
                            id="incrementInput"
                            type="number"
                            value={incrementVlad}
                            onChange={handleChangeIncrementVlad}
                            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
                        />
                        <button onClick={handleIncrementVlad} className="bg-green-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText">cura</button>
                        <input
                            id="incrementInput"
                            type="number"
                            value={incrementManaVlad}
                            onChange={handleChangeIncrementManaVlad}
                            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
                        />
                        <button onClick={handleIncrementManaVlad} className="bg-blue-600 px-2 py-1 rounded-lg font-semibold uppercase text-gray-baldurText">mana</button>
                    </div>
                    <div className="h-20 p-2 flex gap-2 mb-0.5">
                        {skillsVlad.map((skill) => (
                            <SkillBattle key={skill.name}
                                name={skill.name}
                                image={skill.image}
                                magic={skill.magic}
                                description={skill.description}
                                type={skill.type}
                                mana={skill.mana} 
                                onClick={() => {
                                    // Chama a função correta com base no nome da habilidade
                                    switch (skill.name) {
                                        case "Sangue de Ferro":
                                            sangueDeFerro();
                                            break;
                                        case "Foco de Força":
                                            focoDeForca();
                                            break;
                                        case "Regeneração":
                                            regeneracao();
                                            break;
                                        case "Gladiador Imortal":
                                            gladiadorImortal();
                                            break;
                                        case "Blood Armor":
                                            bloodArmor();
                                            break;
                                        case "Blood Shield":
                                            bloodShield();
                                            break;
                                        case "Transfusão Sanguínea":
                                            transfusaoSanguinea();
                                            break;
                                        case "Reflexo Sanquíneo":
                                            reflexoSanguineoVlad();
                                            break;
                                        case "Agulhas de Sangue":
                                            agulhaSangueVlad();
                                            break;
                                        case "Pinguins Imperiais":
                                            pinguinsVlad();
                                            break;
                                        case "Cães Infernais":
                                            caesInfernais();
                                            break;
                                        default:
                                            console.log("Habilidade não encontrada!");
                                    }
                                }}
                                clickVladPassiva={skill.name === "Sangue de Ferro" ? clickVladPassiva : null}
                                borderColorVladPassiva={skill.name === "Sangue de Ferro" ? buttonBorderColorVladPassiva : null}
                                clickVladUlt={skill.name ==="Cães Infernais" ? clickUltVlad : null}
                                borderColorVladUlt={skill.name ==="Cães Infernais" ? buttonBorderColorUltVlad : null}
                                borderColorVladBloodArmor={skill.name ==="Blood Armor" ? buttonBorderColorVladBloodArmor : null}
                                borderColorVladBloodShield={skill.name ==="Blood Shield" ? buttonBorderColorVladBloodShield : null}
                                />
                        ))}
                        <div className="px-5 ml-36 bg-[url('/image/escudo-ca-battle.png')] bg-cover bg-center">
                            <p className="text-black text-2xl font-bold py-4">{numberVladCA}</p>
                        </div>
                    </div>
                    <div className="w-full h-10 border-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative">
                        <div
                        className="bg-green-500 h-full"
                        style={{ width: `${healthPercentageVlad > 100 ? 100 : healthPercentageVlad}%` }}>
                            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">{numberVladHP}</p>
                        </div>
                    </div>
                    <div className="w-full h-10 border-x-2 border-b-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative">
                        <div
                        className="bg-blue-500 h-full"
                        style={{ width: `${manaPercentageVlad > 100 ? 100 : manaPercentageVlad}%` }}>
                            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">{numberVladMP}</p>
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
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{vladStatus.forcaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{vladStatus.forcaModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur5 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder  px-4 py-2">Destreza</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{vladStatus.destrezaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{vladStatus.destrezaModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur4 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder px-4 py-2">Constituição</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{vladStatus.constituicaoValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{vladStatus.constituicaoModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur5 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder px-4 py-2">Inteligência</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{vladStatus.inteligenciaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{vladStatus.inteligenciaModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur4 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder px-4 py-2">Carisma</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{vladStatus.carismaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{vladStatus.carismaModificador}</td>
                            </tr>
                            <tr className="bg-gray-baldur5 text-gray-baldurText">
                                <td className="border border-gray-baldurBorder px-4 py-2">Sabedoria</td>
                                <td className="border border-gray-baldurBorder px-8 py-2 text-center">{vladStatus.sabedoriaValor}</td>
                                <td className="border border-gray-baldurBorder px-12 py-2 text-center">{vladStatus.sabedoriaModificador}</td>
                            </tr>
                        </tbody>
                    </table>
                    <ButtonProficienciaVlad vladStatus={vladStatus}/>
                </div>
                </div>
            </div>
        </div>
    )
}