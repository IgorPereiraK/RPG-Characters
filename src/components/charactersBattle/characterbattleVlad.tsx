import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import SkillBattle from "../skillBattle";
import { skillsVlad } from "../data/skillsCharacters";
import { vladStatus } from "../data/characterStatus";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatarSmall";
import { characterInfo } from "../data/characterInfo";
import { anotacoesVlad } from "../data/textoCharacters";
import ButtonProficienciaVlad from "../buttons/buttonProficienciaVlad";
import { secondSkillsVlad } from "../data/secondSkillCharacters";
import { useBattleSession } from "../../battle/BattleSession";
import GearDialog from "../../battle/GearDialog";

export default function CharacterBattleVlad() {
  const fighter = useBattleSession().vlad;
  const numberVladHP = fighter.hp;
  const numberVladMP = fighter.mp;
  const numberVladCA = fighter.ca;
  const incrementVlad = fighter.healInput;
  const subtractVlad = fighter.damageInput;
  const incrementManaVlad = fighter.manaInput;
  const modificadorForcaVlad = fighter.forcaMod;
  const modificadorDestrezaVlad = fighter.destrezaMod;
  const modificadorInteligenciaVlad = fighter.inteligenciaMod;
  const modificadorConstituicaoVlad = fighter.constituicaoMod;
  const numberVladAtaque = fighter.ataque;

  const manaPercentageVlad = (numberVladMP / vladStatus.mp) * 100;

  const clickVladPassiva = fighter.passiva;
  const buttonBorderColorVladPassiva = fighter.passivaBorder;
  const clickUltVlad = fighter.ult;
  const buttonBorderColorUltVlad = fighter.ultBorder;
  const buttonBorderColorVladBloodArmor = fighter.bloodArmorBorder;
  const buttonBorderColorVladBloodShield = fighter.bloodShieldBorder;
  const buttonBorderColorVladTransformacao = fighter.transformBorder;
  const clickAntiAtiradorTalento = fighter.antiAtirador;

  const readNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    return Number.isNaN(value) ? 0 : value;
  };

  const handleChangeIncrementVlad = (event: React.ChangeEvent<HTMLInputElement>) => {
    fighter.setHealInput(readNumber(event));
  };
  const handleChangeSubtractVlad = (event: React.ChangeEvent<HTMLInputElement>) => {
    fighter.setDamageInput(readNumber(event));
  };
  const handleChangeIncrementManaVlad = (event: React.ChangeEvent<HTMLInputElement>) => {
    fighter.setManaInput(readNumber(event));
  };

  const handleSubtractVlad = fighter.applyDamage;
  const handleIncrementVlad = fighter.applyHeal;
  const handleIncrementManaVlad = fighter.applyMana;
  const sangueDeFerro = () => fighter.useSkill("Sangue de Ferro");
  const focoDeForca = () => fighter.useSkill("Foco de Força");
  const regeneracao = () => fighter.useSkill("Regeneração");
  const gladiadorImortal = () => fighter.useSkill("Gladiador Imortal");
  const bloodArmor = () => fighter.useSkill("Blood Armor");
  const bloodShield = () => fighter.useSkill("Blood Shield");
  const transfusaoSanguinea = () => fighter.useSkill("Transfusão Sanguínea");
  const reflexoSanguineoVlad = () => fighter.useSkill("Reflexo Sanquíneo");
  const agulhaSangueVlad = () => fighter.useSkill("Agulhas de Sangue");
  const pinguinsVlad = () => fighter.useSkill("Pinguins Imperiais");
  const marcaSangue = () => fighter.useSkill("Marca de Sangue");
  const transformacaoVampirica = () => fighter.useSkill("Transformação Vampírica");
  const caesInfernais = () => fighter.useSkill("Cães Infernais");
  const versatil = () => fighter.useSkill("Versátil");
  const antiAtiradorTalento = fighter.useAntiAtirador;
  const versatilLabel =
    fighter.versatil === "ataque" ? "Ataque" : fighter.versatil === "defesa" ? "Defesa" : "Desativado";

  return (
    <div>
      <div className="grid grid-cols-10 px-10 mt-14 items-end gap-1">
        <div className="col-span-1">
          <Dialog>
            <DialogTrigger className="w-full">
              <img
                src={vladStatus.perfil}
                alt={vladStatus.name}
                className="border-2 border-black rounded-lg"
              />
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
                        <h3>
                          Nome: <span>{characterInfo["Vlad"].name}</span>
                        </h3>
                        <h3>
                          Level: <span>{characterInfo["Vlad"].level}</span>
                        </h3>
                      </div>
                      <div className="border-b-2 border-black flex gap-10">
                        <h3>
                          Classe: <span>{characterInfo["Vlad"].classe}</span>
                        </h3>
                        <h3>
                          Alinhamento:{" "}
                          <span>{characterInfo["Vlad"].alinhamento}</span>
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
                            src="./image/regeneracaoTalento.png"
                            className="block w-full h-full object-cover"
                          />
                        </button>
                        <h3 className="text-gray-baldurText">
                          {anotacoesVlad[7].texto}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <button
                          onClick={antiAtiradorTalento}
                          className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0"
                        >
                          <img
                            src="./image/antiAtiradorTalento.png"
                            className="block w-full h-full object-cover"
                          />
                        </button>
                        <h3 className="text-gray-baldurText">
                          {anotacoesVlad[8].texto}
                        </h3>{" "}
                        <span className="text-gray-baldurText font-bold text-lg">
                          {clickAntiAtiradorTalento}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <button className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
                          <img
                            src="./image/duelistaVlad.png"
                            className="block w-full h-full object-cover"
                          />
                        </button>
                        <h3 className="text-gray-baldurText">
                          {anotacoesVlad[9].texto}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={versatil}
                          className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0"
                        >
                          <img
                            src="./image/Versatil.png"
                            alt="Versátil"
                            className="block w-full h-full object-cover"
                          />
                        </button>
                        <h3 className="text-gray-baldurText">
                          {anotacoesVlad[10].texto}
                        </h3>
                        <span className="text-gray-baldurText font-bold text-lg">
                          {versatilLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <span className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0">
                          <img
                            src="./image/morcegoV.png"
                            alt="Transformação em Morcego"
                            className="block w-full h-full object-cover"
                          />
                        </span>
                        <h3 className="text-gray-baldurText">{anotacoesVlad[11].texto}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => fighter.useSkill("Névoa")}
                          className="inline-flex shrink-0 w-14 h-14 overflow-hidden border-2 rounded-md border-gray-900 p-0"
                        >
                          <img
                            src="./image/Nevoa.png"
                            alt="Transformação em Névoa"
                            className="block w-full h-full object-cover"
                          />
                        </button>
                        <h3 className="text-gray-baldurText">{anotacoesVlad[12].texto}</h3>
                        <span className="text-gray-baldurText font-bold text-lg">
                          {fighter.nevoa === 1 ? "1" : "Gasta"}
                        </span>
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
              value={subtractVlad}
              onChange={handleChangeSubtractVlad}
              className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
            />
            <button
              onClick={handleSubtractVlad}
              className="bg-red-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText"
            >
              dano
            </button>
            <input
              id="incrementInput"
              type="number"
              value={incrementVlad}
              onChange={handleChangeIncrementVlad}
              className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
            />
            <button
              onClick={handleIncrementVlad}
              className="bg-green-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText"
            >
              cura
            </button>
            <input
              id="incrementInput"
              type="number"
              value={incrementManaVlad}
              onChange={handleChangeIncrementManaVlad}
              className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
            />
            <button
              onClick={handleIncrementManaVlad}
              className="bg-blue-600 px-2 py-1 rounded-lg font-semibold uppercase text-gray-baldurText"
            >
              mana
            </button>
          </div>
          <div className="flex justify-between">
            <div className="h-20 p-2 flex gap-2 mb-0.5">
              {secondSkillsVlad.map((skill) => (
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
                      case "Transformação Vampírica":
                        transformacaoVampirica();
                        break;
                      case "Garras Vampírica":
                        transformacaoVampirica();
                        break;
                      case "Mordida Vampírica":
                        transformacaoVampirica();
                        break;
                      case "Transformação Angelical":
                        fighter.useSkill("Transformação Angelical");
                        break;
                      case "Armadura Neutral":
                        fighter.useSkill("Armadura Neutral");
                        break;
                      case "Marca de Sangue":
                        marcaSangue();
                        break;
                      default:
                        console.log("Habilidade não encontrada!");
                    }
                  }}
                  borderColorVladTransformacao={
                    skill.name === "Transformação Vampírica"
                      ? buttonBorderColorVladTransformacao
                      : null
                  }
                  borderColorVladAngelical={
                    skill.name === "Transformação Angelical" ? fighter.angelicalBorder : null
                  }
                  borderColorVladNeutral={
                    skill.name === "Armadura Neutral" ? fighter.neutralBorder : null
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-20 p-2 flex gap-2 mb-0.5">
              {skillsVlad.map((skill) => (
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
                      case "Versátil":
                        versatil();
                        break;
                      default:
                        console.log("Habilidade não encontrada!");
                    }
                  }}
                  clickVladPassiva={
                    skill.name === "Sangue de Ferro" ? clickVladPassiva : null
                  }
                  borderColorVladPassiva={
                    skill.name === "Sangue de Ferro"
                      ? buttonBorderColorVladPassiva
                      : null
                  }
                  clickVladUlt={
                    skill.name === "Cães Infernais" ? clickUltVlad : null
                  }
                  borderColorVladUlt={
                    skill.name === "Cães Infernais"
                      ? buttonBorderColorUltVlad
                      : null
                  }
                  borderColorVladBloodArmor={
                    skill.name === "Blood Armor"
                      ? buttonBorderColorVladBloodArmor
                      : null
                  }
                  borderColorVladBloodShield={
                    skill.name === "Blood Shield"
                      ? buttonBorderColorVladBloodShield
                      : null
                  }
                  borderColorVladTransformacao={
                    skill.name === "Transformação Vampírica"
                      ? buttonBorderColorVladTransformacao
                      : null
                  }
                  borderColorVladVersatil={
                    skill.name === "Versátil" ? fighter.versatilBorder : null
                  }
                />
              ))}
            </div>
            <div className="flex gap-3">
              <div className="text-center py-3">
                <p className="text-gray-baldurText font-bold uppercase">
                  Ataque
                </p>
                <p className="text-gray-baldurText text-2xl font-bold">
                  +{numberVladAtaque}
                </p>
              </div>
              <div className="px-5 bg-[url('/image/escudo-ca-battle.png')] bg-cover bg-center">
                <p className="text-black text-2xl font-bold py-6">
                  {numberVladCA}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-10 border-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative overflow-hidden">
            <div
              className="bg-green-500 h-full"
              style={{
                width: `${Math.min(
                  100,
                  (numberVladHP / (vladStatus.hp + (fighter.sobrevida > 0 ? 90 : 0))) * 100
                )}%`,
              }}
            />
            {fighter.sobrevida > 0 ? (
              <div
                className="absolute top-0 h-full bg-gray-500"
                style={{
                  left: `${Math.min(
                    100,
                    (numberVladHP / (vladStatus.hp + 90)) * 100
                  )}%`,
                  width: `${Math.min(
                    100,
                    (fighter.sobrevida / (vladStatus.hp + 90)) * 100
                  )}%`,
                }}
              />
            ) : null}
            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              {numberVladHP}
              {fighter.sobrevida > 0 ? ` + ${fighter.sobrevida}` : ""}
            </p>
          </div>
          <div className="w-full h-10 border-x-2 border-b-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative">
            <div
              className="bg-blue-500 h-full"
              style={{
                width: `${
                  manaPercentageVlad > 100 ? 100 : manaPercentageVlad
                }%`,
              }}
            >
              <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                {numberVladMP}
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
                    {vladStatus.forcaValor}
                  </td>
                  <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                    {modificadorForcaVlad}
                  </td>
                </tr>
                <tr className="bg-gray-baldur5 text-gray-baldurText">
                  <td className="border border-gray-baldurBorder  px-4 py-2">
                    Destreza
                  </td>
                  <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                    {vladStatus.destrezaValor}
                  </td>
                  <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                    +{modificadorDestrezaVlad}
                  </td>
                </tr>
                <tr className="bg-gray-baldur4 text-gray-baldurText">
                  <td className="border border-gray-baldurBorder px-4 py-2">
                    Constituição
                  </td>
                  <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                    {vladStatus.constituicaoValor}
                  </td>
                  <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                    +{modificadorConstituicaoVlad}
                  </td>
                </tr>
                <tr className="bg-gray-baldur5 text-gray-baldurText">
                  <td className="border border-gray-baldurBorder px-4 py-2">
                    Inteligência
                  </td>
                  <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                    {vladStatus.inteligenciaValor}
                  </td>
                  <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                    +{modificadorInteligenciaVlad}
                  </td>
                </tr>
                <tr className="bg-gray-baldur4 text-gray-baldurText">
                  <td className="border border-gray-baldurBorder px-4 py-2">
                    Carisma
                  </td>
                  <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                    {vladStatus.carismaValor}
                  </td>
                  <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                    +{vladStatus.carismaModificador}
                  </td>
                </tr>
                <tr className="bg-gray-baldur5 text-gray-baldurText">
                  <td className="border border-gray-baldurBorder px-4 py-2">
                    Sabedoria
                  </td>
                  <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                    {vladStatus.sabedoriaValor}
                  </td>
                  <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                    +{vladStatus.sabedoriaModificador}
                  </td>
                </tr>
              </tbody>
            </table>
            <ButtonProficienciaVlad vladStatus={vladStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}
