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
          methood: `GET`, //TODO: typo in the word method
        });
        const parsedData = await data1.json();
        console.log(parsedData);
        if (parsedData) {
          console.log(parsedData);
          setData(parsedData);
        } else throw new Error(`Something went wrong`); //TODO: make errors different
      } catch (err) {
        throw new Error(`Something went wrong`);
      }
    }; //TODO: bring the function out of the useEffect
    //TODO: make it work only if the "data" is empty (=null)
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
        {data && <Menu id={0} key={0}></Menu>}
      </Context.Provider>
    </>
  );
}

export default App;
