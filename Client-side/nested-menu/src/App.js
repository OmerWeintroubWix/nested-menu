import "./App.css";
import { Menu } from "./Components/Menu";
import React, { useState, createContext } from "react";
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
  const [data, setData] = useState(utils.BringAllMenus());

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
        <Menu id={0} key={0}></Menu>
      </Context.Provider>
    </>
  );
}

export default App;
