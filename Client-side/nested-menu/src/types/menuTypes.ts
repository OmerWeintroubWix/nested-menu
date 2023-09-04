export type Id = number

export type Menu = {
    id: Id,
    name: string,
    submenus: Id[],
}

export interface OpenableMenu extends Menu {
    isOpen: boolean,
}