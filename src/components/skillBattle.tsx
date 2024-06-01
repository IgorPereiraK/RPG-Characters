import { Skills } from "./types/Skills"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "./ui/tooltip"

  interface BorderColors {
    [key: string]: string | null | undefined;
}

  
  export default function SkillBattle({name, image, magic, description, type, mana, onClick, clickVladPassiva, 
    borderColorVladPassiva, clickVladUlt, borderColorVladUlt, borderColorVladBloodArmor, borderColorVladBloodShield, 
    clickAlexiaPassiva, borderColorAlexiaPassiva, clickAlexiaUlt, borderColorAlexiaUlt, clickRivenPassiva, borderColorRivenPassiva, borderColorRivenBloodArmor, clickRivenUlt, borderColorRivenUlt, borderColorAlexiaArmaduraHightec}: Skills) {
    const borderColors: BorderColors = {
      "Sangue de Ferro": borderColorVladPassiva,
      "Cães Infernais": borderColorVladUlt,
      "Blood Armor": borderColorVladBloodArmor,
      "Blood Shield": borderColorVladBloodShield,
      "Tiro Perfurante": borderColorAlexiaPassiva,
      "Anjo Vampírico": borderColorAlexiaUlt,
      "Míssil Tecnoarcano": borderColorAlexiaUlt,
      "Onipresença": borderColorRivenPassiva,
      "Blood Armor R": borderColorRivenBloodArmor,
      "Cães Infernais R": borderColorRivenUlt,
      "Demon Back": borderColorRivenUlt,
      "Armadura Hightec": borderColorAlexiaArmaduraHightec
  };

    return (
        <div>
            <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger onClick={onClick} className="border-4 rounded-md border-gray-900 transition delay-75" style={{borderColor:  borderColors[name] || ''}}><img src={image} className="w-16 h-16"/></TooltipTrigger>
                            <TooltipContent className="max-w-[400px] bg-gray-baldurSkill">
                                <div className="flex">
                                    <img src={image} className="w-16 h-16"/>
                                    <div className="px-2">
                                        <p className="text-lg font-bold text-gray-100">{name}</p>
                                        <span className="text-gray-baldurText">{magic}</span>
                                    </div>
                                </div>
                                <div className="border-t-2 border-gray-baldurBorder mt-2 py-3 px-1">
                                    <p className="font-medium text-gray-baldurText">{description}</p>
                                </div>
                                <div className="flex px-2 py-1 gap-4 bg-gray-baldurSkill2">
                                    <div className="flex items-center text-gray-100">
                                        {type}
                                    </div>
                                    <div className="flex items-center text-gray-100">
                                        {mana}
                                    </div>
                                    {clickVladPassiva ? (
                                        clickVladPassiva !== 3 ? (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Carregando {clickVladPassiva}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Pronto</span>
                                            </div>
                                        )
                                    ) : null}
                                    {clickVladUlt ? (
                                        clickVladUlt !== 5 ? (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Carregando {clickVladUlt}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Pronto</span>
                                            </div>
                                        )
                                    ) : null}
                                    {clickAlexiaPassiva ? (
                                        clickAlexiaPassiva !== 3 ? (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Carregando {clickAlexiaPassiva}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Pronto</span>
                                            </div>
                                        )
                                    ) : null}
                                    {clickAlexiaUlt ? (
                                        clickAlexiaUlt !== 5 ? (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Carregando {clickAlexiaUlt}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Pronto</span>
                                            </div>
                                        )
                                    ) : null}
                                    {clickRivenPassiva ? (
                                        clickRivenPassiva !== 3 ? (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Carregando {clickRivenPassiva}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Pronto</span>
                                            </div>
                                        )
                                    ) : null}
                                    {clickRivenUlt ? (
                                        clickRivenUlt !== 5 ? (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Carregando {clickRivenUlt}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-gray-100">
                                                <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                                                <span>Pronto</span>
                                            </div>
                                        )
                                    ) : null}
                                </div>
                            </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
        </div>
    )
}