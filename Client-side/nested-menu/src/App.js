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
  const [menuData, setMenuData] = useState(helpData);

  const handleLeftClick = (menuId) => {
    const menuItem = utils.findMenuItemById(menuId, menuData[0]);
    const menuItemHasKids = utils.hasSubMenusById(menuItem);

    //Left click only effect menuItems with kids
    if (menuItemHasKids) {
      const newMenuData = [...helpData]; //shallow copy
      const clickForOpen = utils.isClickedForOpen(menuItem);
      if (clickForOpen) {
        utils.openAllChildren(menuItem);
        setMenuData((prevMenuData) => {
          return { ...prevMenuData };
        });
      } else {
        utils.closeAllChildrens(menuItem);
        setMenuData((prevMenuData) => {
          return { ...prevMenuData };
        });
      }
    }
  };

  const handleRightClick = (menuId) => {
    const userInput = utils.handleUserInput();
    const menuItem = utils.findMenuItemById(menuId, menuData[0]);

    switch (userInput.userChooice) {
      case `Rename`: {
        menuItem.name = userInput.secondOption;
        const newMenuData = [...helpData]; //shallow copy
        setMenuData(newMenuData);
        break;
      }
      case `Add`: {
        let isOpen;

        const hasChild = utils.hasSubMenusById(menuItem);
        //If his child open so his new child will be open too
        //and if they are no open he will not be open too
        if (hasChild) isOpen = menuItem.subMenus[0].isOpen;
        else isOpen = false;
        const newItemToAdd = {
          id: utils.getHighestId(menuData[0]) + 1,
          name: userInput.secondOption,
          isOpen: isOpen,
          subMenus: [],
        };
        console.log(newItemToAdd);
        menuItem.subMenus.push(newItemToAdd);
        const newMenuData = [...helpData]; //shallow copy
        setMenuData(newMenuData);
        break;
      }
      case `Remove`: {
      }
    }
  };

  return (
    <>
      {menuData[0].isOpen && (
        <Menu
          key={menuData[0].id}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
          menuData={menuData[0]}
        ></Menu>
      )}
    </>
  );
}

export default App;
