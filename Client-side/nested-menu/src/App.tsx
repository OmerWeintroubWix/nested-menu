import "./App.css";
import Menu from "./Components/Menu";
import React, {createContext} from "react";
import useMenu from "./hooks/useMenu";

export const Context = createContext<any>({});

function App() {
    const {
        data,
        renameMenuItem,
        addMenuItem,
        deleteMenuItem,
        leftClick
    } = useMenu()

  return (
    <>
      <Context.Provider
        value={{
          data,
          leftClick,
          deleteMenuItem,
          renameMenuItem,
          addMenuItem,
        }}
      >
        {data && <Menu id={0} margin={0} />}
      </Context.Provider>
    </>
  );
}

export default App;
