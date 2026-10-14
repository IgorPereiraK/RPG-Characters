import { FighterController } from "./types";

export function skillBorder(fighter: FighterController, name: string) {
  const borders: Record<string, string> = {
    "Sangue de Ferro": fighter.passivaBorder,
    "Cães Infernais": fighter.ultBorder,
    "Blood Armor": fighter.bloodArmorBorder,
    "Blood Shield": fighter.bloodShieldBorder,
    "Transformação Vampírica": fighter.transformBorder,
    "Garras Vampírica": fighter.transformBorder,
    "Mordida Vampírica": fighter.transformBorder,
    "Tiro Perfurante": fighter.passivaBorder,
    "Anjo Vampírico": fighter.ultBorder,
    "Míssil Tecnoarcano": fighter.ultBorder,
    Onipresença: fighter.passivaBorder,
    "Blood Armor R": fighter.bloodArmorBorder,
    "Cães Infernais R": fighter.ultBorder,
    "Demon Back": fighter.ultBorder,
    "Armadura Hightec": fighter.hightecBorder,
    "Versátil": fighter.versatilBorder,
    "Transformação Angelical": fighter.angelicalBorder,
    "Armadura Neutral": fighter.neutralBorder,
  };

  return borders[name] || "";
}

export function skillCharge(
  fighter: FighterController,
  name: string
): { value: number; ready: number; text?: string } | null {
  if (name === "Reflexo Sanquíneo") {
    if (!fighter.reflexoMarks.some((mark) => mark.stacks > 0)) return null;
    return {
      value: 1,
      ready: 1,
      text: fighter.reflexoMarks.map((mark) => mark.stacks).join(" · "),
    };
  }

  if (name === "Transfusão Sanguínea") {
    return {
      value: fighter.transfusaoCount,
      ready: 3,
      text: `${fighter.transfusaoCount}/3`,
    };
  }

  if (name === "Armadura Neutral") {
    if (fighter.neutralDefesa === 1) return { value: 1, ready: 1, text: "Defesa" };
    if (fighter.neutralCrit > 0) return { value: 1, ready: 1, text: "Crítico" };
    return { value: 0, ready: 1, text: "Usado" };
  }

  if (name === "Transformação Angelical" && fighter.angelical !== "off") {
    return {
      value: 1,
      ready: 1,
      text: fighter.angelical === "ataque" ? "Ataque" : "Defesa",
    };
  }

  if (name === "Versátil" && fighter.versatil !== "off") {
    return {
      value: 1,
      ready: 1,
      text: fighter.versatil === "ataque" ? "Ataque" : "Defesa",
    };
  }

  if (name === "Sangue de Ferro" || name === "Tiro Perfurante" || name === "Onipresença") {
    return { value: fighter.passiva, ready: 3 };
  }

  if (
    name === "Cães Infernais" ||
    name === "Anjo Vampírico" ||
    name === "Míssil Tecnoarcano" ||
    name === "Cães Infernais R" ||
    name === "Demon Back"
  ) {
    return { value: fighter.ult, ready: 5 };
  }

  return null;
}
