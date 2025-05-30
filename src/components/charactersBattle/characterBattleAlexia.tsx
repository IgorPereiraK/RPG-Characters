import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { useState } from "react";
import { alexiaStatus } from "../data/characterStatus";
import { skillsAlexia } from "../data/skillsCharacters";
import SkillBattle from "../skillBattle";
import SelectArmorButtonAlexia from "../selectItensCharacters/selectArmorButtonAlexia";
import SelectItemButtonAlexia from "../selectItensCharacters/selectItemButtonAlexia";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatarSmall";
import { characterInfo } from "../data/characterInfo";
import { anotacoesAlexia } from "../data/textoCharacters";
import ButtonProficienciaAlexia from "../buttons/buttonProficienciaAlexia";
import { secondSkillsAlexia } from "../data/secondSkillCharacters";

export default function CharacterBattleAlexia() {
  const [numberAlexiaHP, setNumberAlexiaHP] = useState<number>(alexiaStatus.hp);
  const [numberAlexiaMP, setNumberAlexiaMP] = useState<number>(alexiaStatus.mp);
  const [numberAlexiaCA, setNumberAlexiaCA] = useState<number>(alexiaStatus.ca);
  const [numberAlexiaCarga, setNumberAlexiaCarga] = useState<
    number | undefined
  >(alexiaStatus.carga);
  const [numberAlexiaAtaque, setNumberAlexiaAtaque] = useState<number>(
    alexiaStatus.inteligenciaModificador
  );
  const [incrementAlexia, setIncrementAlexia] = useState<number>(0);
  const [subtractAlexia, setSubtractAlexia] = useState<number>(0);
  const [incrementManaAlexia, setIncrementManaAlexia] = useState<number>(0);

  const [modificadorForcaAlexia, setModificadorForcaAlexia] = useState<number>(
    alexiaStatus.forcaModificador
  );
  const [modificadorDestrezaAlexia, setModificadorDestrezaAlexia] =
    useState<number>(alexiaStatus.destrezaModificador);
  const [modificadorInteligenciaAlexia, setModificadorInteligenciaAlexia] =
    useState<number>(alexiaStatus.inteligenciaModificador);
  const [modificadorConstituicaoAlexia, setModificadorConstituicaoAlexia] =
    useState<number>(alexiaStatus.constituicaoModificador);
  const [modificadorSabedoriaAlexia, setModificadorSabedoriaAlexia] =
    useState<number>(alexiaStatus.sabedoriaModificador);

  const healthPercentageAlexia = (numberAlexiaHP / alexiaStatus.hp) * 100;
  const manaPercentageAlexia = (numberAlexiaMP / alexiaStatus.mp) * 100;

  const handleChangeIncrementAlexia = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    setIncrementAlexia(value);
  };

  const handleChangeSubtractAlexia = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    setSubtractAlexia(value);
  };

  const handleChangeIncrementManaAlexia = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    setIncrementManaAlexia(value);
  };

  const handleSubtractAlexia = () => {
    const newValue = numberAlexiaHP - subtractAlexia;
    setLimitedNumberAlexiaHP(newValue);
  };

  const handleIncrementAlexia = () => {
    const newValue = numberAlexiaHP + incrementAlexia;
    setLimitedNumberAlexiaHP(newValue);
  };

  const handleIncrementManaAlexia = () => {
    const newValue = numberAlexiaMP + incrementManaAlexia;
    setLimitedNumberAlexiaMP(newValue);
  };

  const setLimitedNumberAlexiaHP = (
    newHP: number | ((prevHP: number) => number)
  ) => {
    if (typeof newHP === "function") {
      setNumberAlexiaHP((prevHP: number) => {
        const result = newHP(prevHP);
        return Math.max(0, Math.min(result, alexiaStatus.hp));
      });
    } else {
      setNumberAlexiaHP(Math.max(0, Math.min(newHP, alexiaStatus.hp)));
    }
  };

  const setLimitedNumberAlexiaMP = (
    newMP: number | ((prevMP: number) => number)
  ) => {
    if (typeof newMP === "function") {
      setNumberAlexiaMP((prevMP: number) => {
        const result = newMP(prevMP);
        return Math.max(0, Math.min(result, alexiaStatus.mp));
      });
    } else {
      setNumberAlexiaMP(Math.max(0, Math.min(newMP, alexiaStatus.mp)));
    }
  };

  const [clickAlexiaPassiva, setClickAlexiaPassiva] = useState(0);
  const [buttonBorderColorAlexiaPassiva, setButtonBorderColorAlexiaPassiva] =
    useState("");

  const tiroPerfurante = () => {
    if (clickAlexiaPassiva === 2) {
      alert("Passiva da Alexia pronta!");
      setClickAlexiaPassiva(3);
      setButtonBorderColorAlexiaPassiva("blue");
    } else if (clickAlexiaPassiva < 2) {
      setClickAlexiaPassiva(clickAlexiaPassiva + 1);
      setButtonBorderColorAlexiaPassiva("");
    } else if (clickAlexiaPassiva === 3) {
      setClickAlexiaPassiva(0);
      setButtonBorderColorAlexiaPassiva("");
    }
  };

  const [clickAlexiaArmaduraHightec, setClickAlexiaArmaduraHightec] =
    useState(0);
  const [
    buttonBorderColorAlexiaArmaduraHightec,
    setButtonBorderColorAlexiaArmaduraHightec,
  ] = useState("");

  const armaduraHightec = () => {
    if (clickAlexiaArmaduraHightec === 1) {
      setModificadorForcaAlexia((statusForca) => statusForca - 2);
      setModificadorDestrezaAlexia((statusDestreza) => statusDestreza - 2);
      setModificadorInteligenciaAlexia(
        (statusInteligencia) => statusInteligencia - 2
      );
      setModificadorConstituicaoAlexia(
        (statusConstituicao) => statusConstituicao - 2
      );
      setModificadorSabedoriaAlexia((statusSabedoria) => statusSabedoria - 2);
      setNumberAlexiaCA((AlexiaCA) => AlexiaCA - 2);
      setNumberAlexiaAtaque((AlexiaAtaque) => AlexiaAtaque - 2);
      setButtonBorderColorAlexiaArmaduraHightec("");
      setClickAlexiaArmaduraHightec(0);
    } else {
      setClickAlexiaArmaduraHightec(clickAlexiaArmaduraHightec + 1);
      setModificadorForcaAlexia((statusForca) => statusForca + 2);
      setModificadorDestrezaAlexia((statusDestreza) => statusDestreza + 2);
      setModificadorInteligenciaAlexia(
        (statusInteligencia) => statusInteligencia + 2
      );
      setModificadorConstituicaoAlexia(
        (statusConstituicao) => statusConstituicao + 2
      );
      setModificadorSabedoriaAlexia((statusSabedoria) => statusSabedoria + 2);
      setNumberAlexiaCA((AlexiaCA) => AlexiaCA + 2);
      setNumberAlexiaAtaque((AlexiaAtaque) => AlexiaAtaque + 2);
      setButtonBorderColorAlexiaArmaduraHightec("red");
    }
  };

  const olhoCoruja = () => {
    setLimitedNumberAlexiaMP((alexiaMP) => alexiaMP - 4);
  };

  const droneAuxiliar = () => {
    setNumberAlexiaCarga((alexiaCG) =>
      alexiaCG !== undefined ? alexiaCG - 1 : 0
    );
  };

  const trincamentoExistente = () => {
    setLimitedNumberAlexiaMP((alexiaMP) => alexiaMP - 6);
  };

  const corvosFabulusos = () => {
    setLimitedNumberAlexiaMP((alexiaMP) => alexiaMP - 5);
  };

  const repulsãoEletrica = () => {
    setNumberAlexiaCarga((alexiaCG) =>
      alexiaCG !== undefined ? alexiaCG - 2 : 0
    );
  };

  const adagasEletrica = () => {
    setNumberAlexiaCarga((alexiaCG) =>
      alexiaCG !== undefined ? alexiaCG - 3 : 0
    );
  };

  const marcaSangue = () => {
    setLimitedNumberAlexiaMP((AlexiaMP) => AlexiaMP - 4);
  };

  const defesaHightec = () => {
    const damage = prompt("Quanto de dano você levou?");

    if (damage !== null) {
      const numeroDamage = parseFloat(damage);

      if (!isNaN(numeroDamage)) {
        const resistance = Math.floor(Math.random() * 6) + 1;

        const result = numeroDamage - resistance;

        const damageResult = numberAlexiaHP - result;

        setLimitedNumberAlexiaHP(damageResult);

        alert(
          `O dano que Alexia levou foi ${numeroDamage}, mas a resistencia da armadura hightec de Alexia reduziu ${resistance} de dano que ela tomou, sendo assim o dano que Alexia levou foi reduzido para ${result}.`
        );
      } else {
        alert("Por favor, insira um número válido.");
      }
    } else {
      alert("Operação cancelada.");
    }
  };

  const [clickUltAlexia, setClickUltAlexia] = useState(0);
  const [buttonBorderColorUltAlexia, setButtonBorderColorUltAlexia] =
    useState("");

  const anjoAndMissil = () => {
    if (clickUltAlexia === 4) {
      alert("Ultimente do Alexia carregada!");
      setClickUltAlexia(5);
      setButtonBorderColorUltAlexia("blue");
    } else if (clickUltAlexia < 4) {
      setClickUltAlexia(clickUltAlexia + 1);
      setButtonBorderColorUltAlexia("");
    } else if (clickUltAlexia === 5) {
      setClickUltAlexia(0);
      setButtonBorderColorUltAlexia("");
    }
  };

  return (
    <div className="grid grid-cols-10 px-10 mt-20 items-end gap-1">
      <div className="col-span-1">
        <Dialog>
          <DialogTrigger className="w-full">
            <img
              src={alexiaStatus.perfil}
              alt={alexiaStatus.name}
              className="border-2 border-black rounded-lg h-60"
            />
          </DialogTrigger>
          <DialogContent className="bg-gray-baldurBgSecond text-gray-baldurText">
            <DialogHeader>
              <DialogTitle>Perfil</DialogTitle>
              <DialogDescription className="pt-4">
                <div className="flex gap-4 items-center">
                  <Avatar className="border-2 border-black">
                    <AvatarImage src={alexiaStatus.perfil}></AvatarImage>
                    <AvatarFallback>VL</AvatarFallback>
                  </Avatar>
                  <div className="w-full text-gray-baldurText text-base">
                    <div className="border-b-2 border-black flex gap-10 mb-2">
                      <h3>
                        Nome: <span>{characterInfo["Alexia"].name}</span>
                      </h3>
                      <h3>
                        Level: <span>{characterInfo["Alexia"].level}</span>
                      </h3>
                    </div>
                    <div className="border-b-2 border-black flex gap-10">
                      <h3>
                        Classe: <span>{characterInfo["Alexia"].classe}</span>
                      </h3>
                      <h3>
                        Alinhamento:{" "}
                        <span>{characterInfo["Alexia"].alinhamento}</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <h2 className="text-xl text-gray-baldurText font-extrabold mb-2">
                    Talentos
                  </h2>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <button className="border-2 rounded-md border-gray-900">
                        <img
                          src="./image/inteligenciaCATalento.png"
                          className="w-14"
                        />
                      </button>
                      <h3 className="text-gray-baldurText">
                        {anotacoesAlexia[1].texto}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <button className="border-2 rounded-md border-gray-900">
                        <img
                          src="./image/cirugiaoTalento.png"
                          className="w-20"
                        />
                      </button>
                      <h3 className="text-gray-baldurText">
                        {anotacoesAlexia[2].texto}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="border-2 rounded-md border-gray-900">
                        <img
                          src="./image/festaMafiaTalento.png"
                          className="w-24"
                        />
                      </button>
                      <h3 className="text-gray-baldurText">
                        {anotacoesAlexia[3].texto}
                      </h3>
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex h-24">
        <SelectArmorButtonAlexia />
        <SelectItemButtonAlexia />
      </div>
      <div className="col-span-6">
        <div className="pb-12 text-center">
          <input
            id="incrementSubtract"
            type="number"
            value={subtractAlexia}
            onChange={handleChangeSubtractAlexia}
            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
          />
          <button
            onClick={handleSubtractAlexia}
            className="bg-red-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText"
          >
            dano
          </button>
          <input
            id="incrementInput"
            type="number"
            value={incrementAlexia}
            onChange={handleChangeIncrementAlexia}
            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
          />
          <button
            onClick={handleIncrementAlexia}
            className="bg-green-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText"
          >
            cura
          </button>
          <input
            id="incrementInput"
            type="number"
            value={incrementManaAlexia}
            onChange={handleChangeIncrementManaAlexia}
            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
          />
          <button
            onClick={handleIncrementManaAlexia}
            className="bg-blue-600 px-2 py-1 rounded-lg font-semibold uppercase text-gray-baldurText"
          >
            mana
          </button>
        </div>
        <div className="flex justify-between">
          <div className="h-20 p-2 flex gap-2 mb-0.5">
            {secondSkillsAlexia.map((skill) => (
              <SkillBattle
                key={skill.name}
                name={skill.name}
                image={skill.image}
                magic={skill.magic}
                description={skill.description}
                type={skill.type}
                mana={skill.mana}
                onClick={() => {
                  // Chama a função correta com base no nome da habilidade
                  switch (skill.name) {
                    case "Defesa Hightec":
                      defesaHightec();
                      break;
                    case "Marca de Sangue":
                      marcaSangue();
                      break;
                    default:
                      console.log("Habilidade não encontrada!");
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="h-20 p-2 flex gap-2 mb-0.5">
            {skillsAlexia.map((skill) => (
              <SkillBattle
                key={skill.name}
                name={skill.name}
                image={skill.image}
                magic={skill.magic}
                description={skill.description}
                type={skill.type}
                mana={skill.mana}
                onClick={() => {
                  // Chama a função correta com base no nome da habilidade
                  switch (skill.name) {
                    case "Olhar da Coruja":
                      olhoCoruja();
                      break;
                    case "Drone Auxiliar":
                      droneAuxiliar();
                      break;
                    case "Tiro Perfurante":
                      tiroPerfurante();
                      break;
                    case "Armadura Hightec":
                      armaduraHightec();
                      break;
                    case "Trincamento sobre Existente":
                      trincamentoExistente();
                      break;
                    case "Corvos Fabulosos":
                      corvosFabulusos();
                      break;
                    case "Repulsão Elétrica":
                      repulsãoEletrica();
                      break;
                    case "Adagas Elétrica":
                      adagasEletrica();
                      break;
                    case "Anjo Vampírico":
                      anjoAndMissil();
                      break;
                    case "Míssil Tecnoarcano":
                      anjoAndMissil();
                      break;
                    default:
                      console.log("Habilidade não encontrada!");
                  }
                }}
                clickAlexiaPassiva={
                  skill.name === "Tiro Perfurante" ? clickAlexiaPassiva : null
                }
                borderColorAlexiaPassiva={
                  skill.name === "Tiro Perfurante"
                    ? buttonBorderColorAlexiaPassiva
                    : null
                }
                borderColorAlexiaArmaduraHightec={
                  skill.name === "Armadura Hightec"
                    ? buttonBorderColorAlexiaArmaduraHightec
                    : null
                }
                clickAlexiaUlt={
                  skill.name === "Anjo Vampírico" ||
                  skill.name === "Míssil Tecnoarcano"
                    ? clickUltAlexia
                    : null
                }
                borderColorAlexiaUlt={
                  skill.name === "Anjo Vampírico" ||
                  skill.name === "Míssil Tecnoarcano"
                    ? buttonBorderColorUltAlexia
                    : null
                }
              />
            ))}
          </div>
          <div className="flex">
            <div className="text-center py-3">
              <p className="text-gray-baldurText font-bold uppercase">Ataque</p>
              <p className="text-gray-baldurText text-2xl font-bold">
                +{numberAlexiaAtaque}
              </p>
            </div>
            <div className="px-5 bg-[url('/image/carga-eletrica.png')] bg-cover bg-center">
              <p className="text-black text-2xl font-bold py-6 px-2">
                {numberAlexiaCarga}
              </p>
            </div>
            <div className="px-5 bg-[url('/image/escudo-ca-battle.png')] bg-cover bg-center">
              <p className="text-black text-2xl font-bold py-6">
                {numberAlexiaCA}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-10 border-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative">
          <div
            className="bg-green-500 h-full"
            style={{
              width: `${
                healthPercentageAlexia > 100 ? 100 : healthPercentageAlexia
              }%`,
            }}
          >
            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              {numberAlexiaHP}
            </p>
          </div>
        </div>
        <div className="w-full h-10 border-x-2 border-b-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative">
          <div
            className="bg-blue-500 h-full"
            style={{
              width: `${
                manaPercentageAlexia > 100 ? 100 : manaPercentageAlexia
              }%`,
            }}
          >
            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              {numberAlexiaMP}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-orange-500 col-span-2">
        <div className="grid col-span-2">
          <table className="table-auto">
            <thead>
              <tr className="bg-gray-baldur3 text-gray-baldurText">
                <th className="border border-gray-baldurBorder px-4 py-2">
                  Atributo
                </th>
                <th className="border border-gray-baldurBorder px-4 py-2">
                  Valor
                </th>
                <th className="border border-gray-baldurBorder px-4 py-2">
                  Modificador
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-baldur4 text-gray-baldurText">
                <td className="border border-gray-baldurBorder px-4 py-2">
                  Força
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {alexiaStatus.forcaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  {modificadorForcaAlexia}
                </td>
              </tr>
              <tr className="bg-gray-baldur5 text-gray-baldurText">
                <td className="border border-gray-baldurBorder  px-4 py-2">
                  Destreza
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {alexiaStatus.destrezaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{modificadorDestrezaAlexia}
                </td>
              </tr>
              <tr className="bg-gray-baldur4 text-gray-baldurText">
                <td className="border border-gray-baldurBorder px-4 py-2">
                  Constituição
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {alexiaStatus.constituicaoValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{modificadorConstituicaoAlexia}
                </td>
              </tr>
              <tr className="bg-gray-baldur5 text-gray-baldurText">
                <td className="border border-gray-baldurBorder px-4 py-2">
                  Inteligência
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {alexiaStatus.inteligenciaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{modificadorInteligenciaAlexia}
                </td>
              </tr>
              <tr className="bg-gray-baldur4 text-gray-baldurText">
                <td className="border border-gray-baldurBorder px-4 py-2">
                  Carisma
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {alexiaStatus.carismaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{alexiaStatus.carismaModificador}
                </td>
              </tr>
              <tr className="bg-gray-baldur5 text-gray-baldurText">
                <td className="border border-gray-baldurBorder px-4 py-2">
                  Sabedoria
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {alexiaStatus.sabedoriaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{modificadorSabedoriaAlexia}
                </td>
              </tr>
            </tbody>
          </table>
          <ButtonProficienciaAlexia alexiaStatus={alexiaStatus} />
        </div>
      </div>
    </div>
  );
}
