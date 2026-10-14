import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { alexiaStatus } from "../data/characterStatus";
import { skillsAlexia } from "../data/skillsCharacters";
import SkillBattle from "../skillBattle";
import { useBattleSession } from "../../battle/BattleSession";
import GearDialog from "../../battle/GearDialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatarSmall";
import { characterInfo } from "../data/characterInfo";
import { anotacoesAlexia } from "../data/textoCharacters";
import ButtonProficienciaAlexia from "../buttons/buttonProficienciaAlexia";
import { secondSkillsAlexia } from "../data/secondSkillCharacters";

export default function CharacterBattleAlexia() {
  const fighter = useBattleSession().alexia;
  const numberAlexiaHP = fighter.hp;
  const numberAlexiaMP = fighter.mp;
  const numberAlexiaCA = fighter.ca;
  const numberAlexiaCarga = fighter.carga;
  const numberAlexiaAtaque = fighter.ataque;
  const incrementAlexia = fighter.healInput;
  const subtractAlexia = fighter.damageInput;
  const incrementManaAlexia = fighter.manaInput;
  const modificadorForcaAlexia = fighter.forcaMod;
  const modificadorDestrezaAlexia = fighter.destrezaMod;
  const modificadorInteligenciaAlexia = fighter.inteligenciaMod;
  const modificadorConstituicaoAlexia = fighter.constituicaoMod;
  const modificadorSabedoriaAlexia = fighter.sabedoriaMod;
  const clickAlexiaPassiva = fighter.passiva;
  const buttonBorderColorAlexiaPassiva = fighter.passivaBorder;
  const buttonBorderColorAlexiaArmaduraHightec = fighter.hightecBorder;
  const clickUltAlexia = fighter.ult;
  const buttonBorderColorUltAlexia = fighter.ultBorder;

  const healthPercentageAlexia = (numberAlexiaHP / alexiaStatus.hp) * 100;
  const manaPercentageAlexia = (numberAlexiaMP / alexiaStatus.mp) * 100;

  const readNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    return Number.isNaN(value) ? 0 : value;
  };

  const handleChangeIncrementAlexia = (event: React.ChangeEvent<HTMLInputElement>) => {
    fighter.setHealInput(readNumber(event));
  };
  const handleChangeSubtractAlexia = (event: React.ChangeEvent<HTMLInputElement>) => {
    fighter.setDamageInput(readNumber(event));
  };
  const handleChangeIncrementManaAlexia = (event: React.ChangeEvent<HTMLInputElement>) => {
    fighter.setManaInput(readNumber(event));
  };
  const handleSubtractAlexia = fighter.applyDamage;
  const handleIncrementAlexia = fighter.applyHeal;
  const handleIncrementManaAlexia = fighter.applyMana;
  const tiroPerfurante = () => fighter.useSkill("Tiro Perfurante");
  const armaduraHightec = () => fighter.useSkill("Armadura Hightec");
  const olhoCoruja = () => fighter.useSkill("Olhar da Coruja");
  const droneAuxiliar = () => fighter.useSkill("Drone Auxiliar");
  const trincamentoExistente = () => fighter.useSkill("Trincamento sobre Existente");
  const corvosFabulusos = () => fighter.useSkill("Corvos Fabulosos");
  const repulsãoEletrica = () => fighter.useSkill("Repulsão Elétrica");
  const adagasEletrica = () => fighter.useSkill("Adagas Elétrica");
  const marcaSangue = () => fighter.useSkill("Marca de Sangue");
  const defesaHightec = () => fighter.useSkill("Defesa Hightec");
  const anjoAndMissil = () => fighter.useSkill("Anjo Vampírico");


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
                      <button className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
                        <img
                          src="./image/inteligenciaCATalento.png"
                          className="block w-full h-full object-cover"
                        />
                      </button>
                      <h3 className="text-gray-baldurText">
                        {anotacoesAlexia[1].texto}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <button className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
                        <img
                          src="./image/cirugiaoTalento.png"
                          className="block w-full h-full object-cover"
                        />
                      </button>
                      <h3 className="text-gray-baldurText">
                        {anotacoesAlexia[2].texto}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
                        <img
                          src="./image/festaMafiaTalento.png"
                          className="block w-full h-full object-cover"
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
        <GearDialog
          items={fighter.armors}
          index={fighter.armorIndex}
          onSelect={fighter.setArmorIndex}
          title="Escolha a sua Armadura de Combate"
          variant="classic"
        />
        <GearDialog
          items={fighter.weapons}
          index={fighter.weaponIndex}
          onSelect={fighter.setWeaponIndex}
          title="Escolha a sua Arma de Combate"
          variant="classic"
        />
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
