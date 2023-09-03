const getMenuItemById = (menuId, dataStracture) =>
  dataStracture.filter((currentMenuItem) => menuId === currentMenuItem.id)[0];

const openChilds = (fatherMenuItemObject, dataStracture) => {
  for (let i = 0; i < fatherMenuItemObject.subMenus.length; i++) {
    const currentItemToOpen = getMenuItemById(
      fatherMenuItemObject.subMenus[i],
      dataStracture
    );
    currentItemToOpen.isOpen = true;
  }
};

const closeChilds = (fatherMenuItemObject, dataStracture) => {
  if (fatherMenuItemObject.subMenus.length === 0) return;
  else {
    for (let i = 0; i < fatherMenuItemObject.subMenus.length; i++) {
      const currentItemToClose = getMenuItemById(
        fatherMenuItemObject.subMenus[i],
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
  if (fatherMenuItemObject.subMenus.length !== 0) {
    const childMenuItem = getMenuItemById(
      fatherMenuItemObject.subMenus[0],
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

const BringAllMenus = async () => {
  try {
    const data = await fetch(
      {
        methood: `GET`,
      },
      `http://localhost:8080/api/menu/`
    );
    const parsedData = await data.json();
    if (parsedData.ok) return parsedData;
    else throw new Error(`Something went wrong`);
  } catch {
    throw new Error(`Something went wrong`);
  }
};

export default {
  getMenuItemById: getMenuItemById,
  handleLeftClick: handleLeftClick,
  BringAllMenus: BringAllMenus,
};
