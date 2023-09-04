import {Id, Menu, OpenableMenu} from "../types/menuTypes";

export const BASE_URL = 'http://localhost:8080/api/menu/'
export const getMenuItemById = (menuId: number, dataStructure: OpenableMenu[]) =>
  dataStructure.filter((currentMenuItem) => currentMenuItem.id === menuId)[0];

export const openChilds = (fatherMenuItemObject: OpenableMenu, dataStructure: OpenableMenu[]) => {
  for (let i = 0; i < fatherMenuItemObject.submenus.length; i++) {
    const currentItemToOpen = getMenuItemById(
      fatherMenuItemObject.submenus[i],
      dataStructure
    );
    currentItemToOpen.isOpen = true;
  }
};

export const closeChilds = (fatherMenuItemObject: Menu, dataStructure: OpenableMenu[]) => {
  if (fatherMenuItemObject.submenus.length === 0) return;
  else {
    for (let i = 0; i < fatherMenuItemObject.submenus.length; i++) {
      const currentItemToClose = getMenuItemById(
        fatherMenuItemObject.submenus[i],
        dataStructure
      );
      if (currentItemToClose.isOpen) {
        currentItemToClose.isOpen = false;

        closeChilds(currentItemToClose, dataStructure);
      }
    }
  }
};

export const isLeftClickToOpen = (fatherMenuItemObject: Menu, dataStructure: OpenableMenu[]) => {
  if (fatherMenuItemObject.submenus.length !== 0) {
    const childMenuItem = getMenuItemById(
      fatherMenuItemObject.submenus[0],
      dataStructure
    );
    return !childMenuItem.isOpen;
  }
  return false;
};

export const handleLeftClick = (clickedId: Id, dataStructure: OpenableMenu[]) => {
  const clickedItem = getMenuItemById(clickedId, dataStructure);
  if (isLeftClickToOpen(clickedItem, dataStructure)) {
    openChilds(clickedItem, dataStructure);
  } else {
    closeChilds(clickedItem, dataStructure);
  }
  return [...dataStructure];
};

const isIdExists = (menuId: Id, data: Menu[]) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === menuId) return true;
  }
  return false;
};

const setIsOpenArrays = (prevArray: OpenableMenu[], newArray: OpenableMenu[]) => {
  for (let i = 0; i < newArray.length; i++) {
    if (isIdExists(newArray[i].id, prevArray)) {
      newArray[i].isOpen = getMenuItemById(newArray[i].id, prevArray).isOpen;
    } else {
      newArray[i].isOpen = false;
    }
  }
};

export const handleDeleteItem = async (menuId: Id, dataStructure: OpenableMenu[]) => {
  try {
    const dataFromServer = await fetch(
      `http://localhost:8080/api/menu/${menuId}`,
      {
        method: `DELETE`,
      }
    );
    const parsedData = await dataFromServer.json();
    if (parsedData) {
      setIsOpenArrays(dataStructure, parsedData);
      return parsedData;
    } else return new Error(`Something went wrong`);
  } catch (err) {
    return new Error(`Something went wrong`);
  }
};

export const handleRenameItem = async (menuId: Id, newName: string, dataStructure: OpenableMenu[]) => {
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
      setIsOpenArrays(dataStructure, parsedData);
      return parsedData;
    } else return new Error(`Something went wrong`);
  } catch (err) {
    return new Error(`Something went wrong`);
  }
};

export const handleAddItem = async (menuIdFather: Id, newItemName: string, dataStructure: OpenableMenu[]) => {
  try {
    const dataFromServer = await fetch(`http://localhost:8080/api/menu/`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header for JSON data
      },
      body: JSON.stringify({ parentId: menuIdFather, name: newItemName }),
    });
    const parsedData = await dataFromServer.json();
    // console.log(parsedData);
    if (parsedData) {
      setIsOpenArrays(dataStructure, parsedData);
      return parsedData;
    } else return new Error(`Something went wrong`);
  } catch (err) {
    return new Error(`Something went wrong`);
  }
};