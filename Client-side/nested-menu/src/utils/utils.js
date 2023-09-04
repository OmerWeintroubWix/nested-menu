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

const setIsOpenArrays = (prevArray, newArray) => {
  console.log(prevArray, 1);
  console.log(newArray, 2);
  for (let i = 0; i < newArray.length; i++) {
    newArray[i].isOpen = getMenuItemById(newArray[i].id, prevArray).isOpen;
    console.log(newArray[i]);
  }
};

const handleRemoveItem = async (menuId, dataStracture) => {
  try {
    const dataFromServer = await fetch(
      `http://localhost:8080/api/menu/${menuId}`,
      {
        method: `DELETE`,
      }
    );
    const parsedData = await dataFromServer.json();
    if (parsedData) {
      setIsOpenArrays(dataStracture, parsedData);
      return parsedData;
    } else return new Error(`Something went wrong`);
  } catch (err) {
    return new Error(`Something went wrong`);
  }
};

export default {
  getMenuItemById: getMenuItemById,
  handleLeftClick: handleLeftClick,
  handleRemoveItem: handleRemoveItem,
};
