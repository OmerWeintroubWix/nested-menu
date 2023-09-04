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

const isIdExists = (menuId, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === menuId) return true;
  }
  return false;
};

const setIsOpenArrays = (prevArray, newArray) => {
  for (let i = 0; i < newArray.length; i++) {
    if (isIdExists(newArray[i].id, prevArray)) {
      newArray[i].isOpen = getMenuItemById(newArray[i].id, prevArray).isOpen;
    } else {
      newArray[i].isOpen = false;
    }
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

const handleRenameItem = async (menuId, newName, dataStracture) => {
  try {
    const dataFromServer = await fetch(
      `http://localhost:8080/api/menu/${menuId}`,
      {
        method: `PUT`,
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header for JSON data
        },
        body: JSON.stringify({ newName: newName }),
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

const handleAddItem = async (menuIdFather, newItemName, dataStracture) => {
  try {
    const dataFromServer = await fetch(`http://localhost:8080/api/menu/`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header for JSON data
      },
      body: JSON.stringify({ parentId: menuIdFather, name: newItemName }),
    });
    const parsedData = await dataFromServer.json();
    console.log(parsedData);
    if (parsedData) {
      setIsOpenArrays(dataStracture, parsedData);
      return parsedData;
    } else return new Error(`Something went wrong`);
  } catch (err) {
    return new Error(`Something went wrong`);
  }
};

export default {
  getMenuItemById,
  handleLeftClick,
  handleRemoveItem,
  handleRenameItem,
  handleAddItem,
};
