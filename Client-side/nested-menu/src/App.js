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
        const data1 = await fetch(`http://localhost:8080/api/menu/`, {
          methood: `GET`,
        });
        const parsedData = await data1.json();
        if (parsedData.ok) {
          setData(parsedData);
        } else throw new Error(`Something went wrong`);
      } catch (err) {
        throw new Error(`Something went wrong`);
      }
    };
    BringAllMenus();
  }, []);

  const leftClick = (clickedId) =>
    setData((prevData) => utils.handleLeftClick(clickedId, prevData));

  const deleteMenuItem = (menuId) => {};

  return (
    <>
      <Context.Provider
        value={{
          dataStracture: data,
          leftClick: leftClick,
          deleteMenuItem: deleteMenuItem,
        }}
      >
        {null && <Menu id={0} key={0}></Menu>}
      </Context.Provider>
    </>
  );
}

export default App;
