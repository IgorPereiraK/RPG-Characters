import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { rivenStatus } from "../data/characterStatus";
import { useBattleSession } from "../../battle/BattleSession";
import GearDialog from "../../battle/GearDialog";
import { skillsRiven } from "../data/skillsCharacters";
import SkillBattle from "../skillBattle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatarSmall";
import { characterInfo } from "../data/characterInfo";
import { anotacoesRiven } from "../data/textoCharacters";
import ButtonProficienciaRiven from "../buttons/buttonProficienciaRiven";
import { secondSkillsRiven } from "../data/secondSkillCharacters";

export default function CharacterBattleRiven() {
  const fighter = useBattleSession().riven;
  const numberRivenHP = fighter.hp;
  const numberRivenMP = fighter.mp;
  const numberRivenCA = fighter.ca;
  const numberRivenAtaque = fighter.ataque;
  const incrementRiven = fighter.healInput;
  const subtractRiven = fighter.damageInput;
  const incrementManaRiven = fighter.manaInput;
  const clickRivenPassiva = fighter.passiva;
  const buttonBorderColorRivenPassiva = fighter.passivaBorder;
  const buttonBorderColorRivenBloodArmor = fighter.bloodArmorBorder;
  const clickUltRiven = fighter.ult;
  const buttonBorderColorUltRiven = fighter.ultBorder;
  const clickAntiAtiradorTalento = fighter.antiAtirador;

  const healthPercentageRiven = (numberRivenHP / rivenStatus.hp) * 100;
  const manaPercentageRiven = (numberRivenMP / rivenStatus.mp) * 100;

  const readNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    return Number.isNaN(value) ? 0 : value;
  };

  const handleChangeIncrementRiven = (event: React.ChangeEvent<HTMLInputElement>) => {
    fighter.setHealInput(readNumber(event));
  };
  const handleChangeSubtractRiven = (event: React.ChangeEvent<HTMLInputElement>) => {
    fighter.setDamageInput(readNumber(event));
  };
  const handleChangeIncrementManaRiven = (event: React.ChangeEvent<HTMLInputElement>) => {
    fighter.setManaInput(readNumber(event));
  };
  const handleSubtractRiven = fighter.applyDamage;
  const handleIncrementRiven = fighter.applyHeal;
  const handleIncrementManaRiven = fighter.applyMana;
  const fotossintese = () => fighter.useSkill("Fotossíntese");
  const onipresenca = () => fighter.useSkill("Onipresença");
  const focoDeForcaRiven = () => fighter.useSkill("Foco de Força");
  const bloodArmorRiven = () => fighter.useSkill("Blood Armor R");
  const transfusaoSanguineaRiven = () => fighter.useSkill("Transfusão Sanguínea");
  const agulhaSangueRiven = () => fighter.useSkill("Agulhas de Sangue");
  const musculoTonificarAmpliar = () => fighter.useSkill("Músculo Tonificar ou Ampliar");
  const erupcaoPlasmatica = () => fighter.useSkill("Erupção Plasmática");
  const trovaoContracao = () => fighter.useSkill("Trovão de Contração");
  const confusao = () => fighter.useSkill("Confusão");
  const psybean = () => fighter.useSkill("Psy Bean");
  const marcaSangue = () => fighter.useSkill("Marca de Sangue");
  const demonBackAndCaesInfernais = () => fighter.useSkill("Demon Back");
  const regeneracao = () => fighter.useRegeneracao();
  const gladiadorImortal = () => fighter.useGladiador();
  const antiAtiradorTalento = fighter.useAntiAtirador;


  return (
    <div className="grid grid-cols-10 px-10 mt-20 items-end gap-1">
      <div className="col-span-1">
        <Dialog>
          <DialogTrigger className="w-full h-full">
            <img
              src={rivenStatus.perfil}
              alt={rivenStatus.name}
              className="border-2 border-black rounded-lg h-60"
            />
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
                      <h3>
                        Nome: <span>{characterInfo["Riven"].name}</span>
                      </h3>
                      <h3>
                        Level: <span>{characterInfo["Riven"].level}</span>
                      </h3>
                    </div>
                    <div className="border-b-2 border-black flex gap-10">
                      <h3>
                        Classe: <span>{characterInfo["Riven"].classe}</span>
                      </h3>
                      <h3>
                        Alinhamento:{" "}
                        <span>{characterInfo["Riven"].alinhamento}</span>
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
                      <button
                        onClick={regeneracao}
                        className="border-2 rounded-md border-gray-900"
                      >
                        <img
                          src="./image/regeneracaoTalento.png"
                          className="w-16"
                        />
                      </button>
                      <h3 className="text-gray-baldurText">
                        {anotacoesRiven[2].texto}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <button
                        onClick={antiAtiradorTalento}
                        className="border-2 rounded-md border-gray-900"
                      >
                        <img
                          src="./image/antiAtiradorTalento.png"
                          className="w-20"
                        />
                      </button>
                      <h3 className="text-gray-baldurText">
                        {anotacoesRiven[3].texto}
                      </h3>{" "}
                      <span className="text-gray-baldurText font-bold text-lg">
                        {clickAntiAtiradorTalento}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={gladiadorImortal}
                        className="border-2 rounded-md border-gray-900"
                      >
                        <img
                          src="./image/duelistaTalento.png"
                          className="w-16"
                        />
                      </button>
                      <h3 className="text-gray-baldurText">
                        {anotacoesRiven[4].texto}
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
            value={subtractRiven}
            onChange={handleChangeSubtractRiven}
            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
          />
          <button
            onClick={handleSubtractRiven}
            className="bg-red-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText"
          >
            dano
          </button>
          <input
            id="incrementInput"
            type="number"
            value={incrementRiven}
            onChange={handleChangeIncrementRiven}
            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
          />
          <button
            onClick={handleIncrementRiven}
            className="bg-green-600 px-2 py-1 rounded-lg font-semibold uppercase mr-12 text-gray-baldurText"
          >
            cura
          </button>
          <input
            id="incrementInput"
            type="number"
            value={incrementManaRiven}
            onChange={handleChangeIncrementManaRiven}
            className="w-14 rounded-lg ml-1 py-1 mr-1 bg-gray-300 border-2 border-gray-700 text-black"
          />
          <button
            onClick={handleIncrementManaRiven}
            className="bg-blue-600 px-2 py-1 rounded-lg font-semibold uppercase text-gray-baldurText"
          >
            mana
          </button>
        </div>
        <div className="flex justify-between">
          <div className="h-20 p-2 flex gap-2 mb-0.5">
            {secondSkillsRiven.map((skill) => (
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
                    case "Marca de Sangue":
                      marcaSangue();
                      break;
                    case "Psy Bean":
                      psybean();
                      break;
                    default:
                      console.log("Habilidade não encontrada!");
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className="h-20 p-2 flex gap-2 mb-0.5">
          {skillsRiven.map((skill) => (
            <SkillBattle
              key={skill.name}
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
              clickRivenPassiva={
                skill.name === "Onipresença" ? clickRivenPassiva : null
              }
              borderColorRivenPassiva={
                skill.name === "Onipresença"
                  ? buttonBorderColorRivenPassiva
                  : null
              }
              borderColorRivenBloodArmor={
                skill.name === "Blood Armor R"
                  ? buttonBorderColorRivenBloodArmor
                  : null
              }
              clickRivenUlt={
                skill.name === "Cães Infernais R" || skill.name === "Demon Back"
                  ? clickUltRiven
                  : null
              }
              borderColorRivenUlt={
                skill.name === "Cães Infernais R" || skill.name === "Demon Back"
                  ? buttonBorderColorUltRiven
                  : null
              }
            />
          ))}
          <div className="flex gap-3">
            <div className="text-center py-1">
              <p className="text-gray-baldurText font-bold uppercase">Ataque</p>
              <p className="text-gray-baldurText text-2xl font-bold">
                +{numberRivenAtaque}
              </p>
            </div>
            <div className="px-5 bg-[url('/image/escudo-ca-battle.png')] bg-cover bg-center">
              <p className="text-black text-2xl font-bold py-4">
                {numberRivenCA}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-10 border-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative">
          <div
            className="bg-green-500 h-full"
            style={{
              width: `${
                healthPercentageRiven > 100 ? 100 : healthPercentageRiven
              }%`,
            }}
          >
            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              {numberRivenHP}
            </p>
          </div>
        </div>
        <div className="w-full h-10 border-x-2 border-b-2 bg-gray-300 text-center text-xl font-bold text-black border-black relative">
          <div
            className="bg-blue-500 h-full"
            style={{
              width: `${
                manaPercentageRiven > 100 ? 100 : manaPercentageRiven
              }%`,
            }}
          >
            <p className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              {numberRivenMP}
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
                  {rivenStatus.forcaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{rivenStatus.forcaModificador}
                </td>
              </tr>
              <tr className="bg-gray-baldur5 text-gray-baldurText">
                <td className="border border-gray-baldurBorder  px-4 py-2">
                  Destreza
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {rivenStatus.destrezaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{rivenStatus.destrezaModificador}
                </td>
              </tr>
              <tr className="bg-gray-baldur4 text-gray-baldurText">
                <td className="border border-gray-baldurBorder px-4 py-2">
                  Constituição
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {rivenStatus.constituicaoValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{rivenStatus.constituicaoModificador}
                </td>
              </tr>
              <tr className="bg-gray-baldur5 text-gray-baldurText">
                <td className="border border-gray-baldurBorder px-4 py-2">
                  Inteligência
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {rivenStatus.inteligenciaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{rivenStatus.inteligenciaModificador}
                </td>
              </tr>
              <tr className="bg-gray-baldur4 text-gray-baldurText">
                <td className="border border-gray-baldurBorder px-4 py-2">
                  Carisma
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {rivenStatus.carismaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  +{rivenStatus.carismaModificador}
                </td>
              </tr>
              <tr className="bg-gray-baldur5 text-gray-baldurText">
                <td className="border border-gray-baldurBorder px-4 py-2">
                  Sabedoria
                </td>
                <td className="border border-gray-baldurBorder px-8 py-2 text-center">
                  {rivenStatus.sabedoriaValor}
                </td>
                <td className="border border-gray-baldurBorder px-12 py-2 text-center">
                  {rivenStatus.sabedoriaModificador}
                </td>
              </tr>
            </tbody>
          </table>
          <ButtonProficienciaRiven rivenStatus={rivenStatus} />
        </div>
      </div>
    </div>
  );
}
