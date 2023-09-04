import "./App.css";
import { Menu } from "./Components/Menu";
import React, { useState, createContext, useEffect } from "react";
import utils from "./utils/utils";
export const Context = createContext();

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const BringAllMenus = async () => {
      try {
        const data1 = await fetch(`http://localhost:8080/api/menu/`, {
          method: `GET`, //TODO: typo in the word method
        });
        const parsedData = await data1.json();
        if (parsedData) {
          const relevantData = parsedData.map((currentMenu, index) => {
            const currentItem = { ...currentMenu };
            if (index === 0) currentItem.isOpen = true;
            else currentItem.isOpen = false;
            return currentItem;
          });
          setData(relevantData);
        } else throw new Error(`Something went wrong`);
      } catch {
        throw new Error(`Something went wrong`);
      }
    }; //TODO: bring the function out of the useEffect
    //TODO: make it work only if the "data" is empty (=null)
    BringAllMenus();
  }, []);

  const leftClick = (clickedId) => {
    setData((prevData) => {
      return utils.handleLeftClick(clickedId, prevData);
    });
  };
  const deleteMenuItem = async (menuId) => {
    const newArray = await utils.handleRemoveItem(menuId, data);
    setData(newArray);
  };
  const renameMenuItem = async (menuId) => {
    const newName = prompt("Please enter the new name");
    const newArray = await utils.handleRenameItem(menuId, newName, data);
    setData(newArray);
  };
  const addMenuItem = async (fatherId) => {
    const newName = prompt("Please enter the child name");
    const newArray = await utils.handleAddItem(fatherId, newName, data);
    setData(newArray);
  };

  return (
    <>
      <Context.Provider
        value={{
          dataStracture: data,
          leftClick: leftClick,
          deleteMenuItem: deleteMenuItem,
          renameMenuItem: renameMenuItem,
          addMenuItem: addMenuItem,
        }}
      >
        {data && <Menu id={0} key={0} margin={0}></Menu>}
      </Context.Provider>
    </>
  );
}

export default App;
