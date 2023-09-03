import {Id, Menu} from "./menuTypes";
export const deleteElById = (menusArr: Menu[], menuId: Id) => {
    let arrCopy = [...menusArr]
    for (let i = 0; i < arrCopy.length; i++) {
        if (arrCopy[i].id == menuId) {
            console.log(arrCopy[i].submenus)
            if (arrCopy[i].submenus.length > 0) {
                for (let j = 0; j < arrCopy[i].submenus.length; j++) {
                    console.log(arrCopy[i].submenus[j])
                    arrCopy = deleteElById(arrCopy, arrCopy[i].submenus[j])
                }
            }
            arrCopy.splice(i, 1)
        }
        arrCopy.splice(i, 1);
    }
    return arrCopy
}
