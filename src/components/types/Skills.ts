export type Skills = {
    name: string
    image: string
    magic: string
    description: React.ReactNode | string
    type: React.ReactNode | string
    mana?: React.ReactNode | string
    onClick?: () => void
    clickVladPassiva?: React.ReactNode | string
    borderColorVladPassiva?: string | null
    clickVladUlt?: React.ReactNode | string
    borderColorVladUlt?: string | null
    borderColorVladBloodArmor?: string | null
    borderColorVladBloodShield?: string | null
    clickAlexiaPassiva?: React.ReactNode | string
    borderColorAlexiaPassiva?: string | null
    clickAlexiaUlt?: React.ReactNode | string
    borderColorAlexiaUlt?: string | null
    clickRivenPassiva?: React.ReactNode | string
    borderColorRivenPassiva?: string | null
    borderColorRivenBloodArmor?: string | null
    clickRivenUlt?: React.ReactNode | string
    borderColorRivenUlt?: string | null
}