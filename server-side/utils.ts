import {Id, Menu} from "./menuTypes";
export const deleteElById = (menusArr: Menu[], menuId: Id) => {
    let arrCopy = [...menusArr]
    for (let i = arrCopy.length - 1; i >= 0; i--) {
        if (arrCopy[i].submenus.includes(menuId)) {
            arrCopy[i].submenus = arrCopy[i].submenus.filter(item => item != menuId)
        }
        if (arrCopy[i].id == menuId) {
            if (arrCopy[i].submenus.length > 0) {
                for (let j = arrCopy[i].submenus.length - 1; j >= 0; j--) {
                    arrCopy = deleteElById(arrCopy, arrCopy[i].submenus[j])
                }
            }
            arrCopy.splice(i, 1);
        }
    }
    return arrCopy
}
