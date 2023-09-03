const getMenuItemById = (menuId, dataStracture) =>
  dataStracture.filter((currentMenuItem) => menuId === currentMenuItem.id)[0];

const openChilds = (fatherMenuItemObject, dataStracture) => {
  for (let i = 0; i < fatherMenuItemObject.submenus.length; i++) {
    const currentItemToOpen = getMenuItemById(
      fatherMenuItemObject.submenus[i],
      dataStracture
    );
    currentItemToOpen.isOpen = true;
  }
};

const closeChilds = (fatherMenuItemObject, dataStracture) => {
  if (fatherMenuItemObject.submenus.length === 0) return;
  else {
    for (let i = 0; i < fatherMenuItemObject.submenus.length; i++) {
      const currentItemToClose = getMenuItemById(
        fatherMenuItemObject.submenus[i],
        dataStracture
      );
      if (currentItemToClose.isOpen) {
        currentItemToClose.isOpen = false;

        closeChilds(currentItemToClose, dataStracture);
      }
    }
  }
};

const isLeftClickToOpen = (fatherMenuItemObject, dataStracture) => {
  if (fatherMenuItemObject.submenus.length !== 0) {
    const childMenuItem = getMenuItemById(
      fatherMenuItemObject.submenus[0],
      dataStracture
    );
    return !childMenuItem.isOpen;
  }
  return false;
};

const handleLeftClick = (clickedId, dataStracture) => {
  const clickedItem = getMenuItemById(clickedId, dataStracture);
  if (isLeftClickToOpen(clickedItem, dataStracture)) {
    openChilds(clickedItem, dataStracture);
  } else {
    closeChilds(clickedItem, dataStracture);
  }
  return [...dataStracture];
};

const handleRemoveItem = async (menuId) => {
  try {
    const dataFromServer = await fetch(
      `http://localhost:8080/api/menu/${menuId}`
    );
  } catch {}
};

export default {
  getMenuItemById: getMenuItemById,
  handleLeftClick: handleLeftClick,
};
