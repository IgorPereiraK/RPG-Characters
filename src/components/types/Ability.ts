export type Ability = {
    name: string
    image: string
    description: string
    mana?: string
    table?: React.ReactNode | string
}

export interface AbilityCardProps {
    ability: Ability;
    onClick?: () => void
    isSelected: boolean
}