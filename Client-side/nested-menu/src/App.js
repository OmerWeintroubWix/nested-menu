import "./App.css";
import { Menu } from "./Components/Menu";
import React, { useState, createContext } from "react";
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
  const leftClick = () => {};

  return (
    <>
      <Context.Provider
        value={{ dataStracture: helpData, leftClick: leftClick }}
      >
        <Menu id={0} key={0}></Menu>
      </Context.Provider>
    </>
  );
}

export default App;
