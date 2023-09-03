import "./App.css";
import { Menu } from "./Components/Menu";
import utils from "./Utils/utils";
import React, { useState } from "react";

const helpData = [
  {
    id: 0,
    name: "Menu",
    isOpen: true,
    subMenus: [
      {
        id: 1,
        name: "Boys",
        isOpen: false,
        subMenus: [
          { id: 3, name: "omer", isOpen: false, subMenus: [] },
          {
            id: 4,
            name: "idan",
            isOpen: false,
            subMenus: [
              { id: 5, name: "weintroub", isOpen: false, subMenus: [] },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Girls",
        isHidden: false,
        subMenus: [{ id: 6, name: "Loli", isOpen: false, subMenus: [] }],
      },
    ],
  },
];

function App() {
  return <></>;
}

export default App;
