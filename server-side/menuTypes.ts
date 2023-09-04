export type Id = number

export type Menu = {
    id: Id,
    name: string,
    submenus: Id[],
}
