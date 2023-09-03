import "./App.css";
import { Menu } from "./Components/Menu";
import React, { useState, createContext, useEffect } from "react";
import utils from "./utils/utils";
export const Context = createContext();

const helpData = [
  { id: 0, name: "Menu", isOpen: true, subMenus: [1, 2] },
  { id: 1, name: "Men", isOpen: false, subMenus: [3] },
  { id: 2, name: "Women", isOpen: false, subMenus: [5, 6] },
  { id: 3, name: "Omer", isOpen: false, subMenus: [4] },
  { id: 4, name: "Weintroub", isOpen: false, subMenus: [] },
  { id: 5, name: "Gali", isOpen: false, subMenus: [] },
  { id: 6, name: "Tal", isOpen: false, subMenus: [] },
];

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const BringAllMenus = async () => {
      try {
        const data = await fetch(`http://localhost:8080/api/menu/`, {
          methood: `GET`,
        });
        const parsedData = await data.json();
        if (parsedData) {
          const relevantData = parsedData.map((currentMenu, index) => {
            const currentItem = { ...currentMenu };
            if (index === 0) currentItem.isOpen = true;
            else currentItem.isOpen = false;
            console.log(currentItem);
            return currentItem;
          });
          console.log(relevantData);
          setData(relevantData);
        } else throw new Error(`Something went wrong`);
      } catch {
        throw new Error(`Something went wrong`);
      }
    };
    BringAllMenus();
  }, []);

  const leftClick = (clickedId) => {
    setData((prevData) => {
      return utils.handleLeftClick(clickedId, prevData);
    });
  };

  const deleteMenuItem = async (menuId) => {
    console.log(menuId);
  };

  return (
    <>
      <Context.Provider
        value={{
          dataStracture: data,
          leftClick: leftClick,
          deleteMenuItem: deleteMenuItem,
        }}
      >
        {data && <Menu id={0} key={0}></Menu>}
      </Context.Provider>
    </>
  );
}

export default App;
