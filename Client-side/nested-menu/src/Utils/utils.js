//Function that close all "Dorot" of menuItem
//menuItem has kids for sure
const closeAllChildrens = (menuItem) => {
  for (let i = 0; i < menuItem.subMenus.length; i++) {
    menuItem.subMenus[i].isOpen = false;
    closeAllChildrens(menuItem.subMenus[i]);
  }
};

//Function that open all kids for menuItem that for sure with kids
const openAllChildren = (menuItem) => {
  for (let i = 0; i < menuItem.subMenus.length; i++)
    menuItem.subMenus[i].isOpen = true;
};

//Function the get look if there is menu id in the data
const isMenuIdExists = (menuId, menuItem) => {
  if (menuId === menuItem.id) return true;
  else {
    for (let i = 0; i < menuItem.subMenus.length; i++) {
      if (isMenuIdExists(menuId, menuItem.subMenus[i])) return true;
    }
    return false;
  }
};

//Function that get exist menuID
//get menuId and the first menu object
//return pointer to his object in the array
const findMenuItemById = (menuId, menuItem) => {
  if (menuId === menuItem.id) return menuItem;
  else {
    for (let i = 0; i < menuItem.subMenus.length; i++) {
      if (isMenuIdExists(menuId, menuItem.subMenus[i])) {
        return findMenuItemById(menuId, menuItem.subMenus[i]);
      }
    }
  }
};

//Function that check if menuItem has kids
//Get menuItem
//Return True(has Kids overoll) False(Doesnt has kids at all)
const hasSubMenusById = (menuItem) => menuItem.subMenus.length > 0;

//Function that get only items with kids and check for what
//Reason the Clicked was
//Get menuItem with kids
//Return True(if clicked for open menu) False(if clicked for close menu)
const isClickedForOpen = (menuItem) => !menuItem.subMenus[0].isOpen;

//Function that handle user input when Right clicking
const handleUserInput = () => {
  const messageToUser = `Please select: 
Add
Remove
Rename`;
  const userChooice = prompt(messageToUser);
  let secondOption;
  if (userChooice === `Add`)
    secondOption = prompt(`Please select a name for new child`);
  else if (userChooice === `Rename`)
    secondOption = prompt(`Please select new name`);

  return { userChooice: userChooice, secondOption: secondOption };
};

//Function the get the highest id the the data starcture
const getHighestId = (menuItem) => {
  console.log(menuItem.id);
  if (menuItem.subMenus.length === 0) {
    return menuItem.id;
  } else {
    let max = menuItem.id;
    for (let i = 0; i < menuItem.subMenus.length; i++) {
      const currentChildMax = getHighestId(menuItem.subMenus[i]);
      if (currentChildMax > max) max = currentChildMax;
    }
    return max;
  }
};

//Function that delete menu Item
const deleteItem = (menuItemFather, menuIdToDelete) => {};

export default {
  closeAllChildrens: closeAllChildrens,
  openAllChildren: openAllChildren,
  isMenuIdExists: isMenuIdExists,
  findMenuItemById: findMenuItemById,
  hasSubMenusById: hasSubMenusById,
  isClickedForOpen: isClickedForOpen,
  handleUserInput: handleUserInput,
  getHighestId: getHighestId,
  deleteItem: deleteItem,
};
