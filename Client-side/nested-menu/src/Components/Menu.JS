import "./Menu.css";
import { useContext, useState } from "react";
import { Context } from "../App";
import utils from "../utils/utils";

export function Menu(props) {
  const [isRightClicked, setIsRightClicked] = useState(false);
  const data = useContext(Context);

  //Get the object that represent that menuItem
  const menuData = utils.getMenuItemById(props.id, data.dataStracture);

  return (
    <>
      <div
        id={`menu-id-${props.id}`}
        onClick={() => data.leftClick(props.id)}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsRightClicked((prevState) => !prevState);
        }}
        className="menu-item"
        style={{ marginLeft: `${props.margin}px` }}
      >
        <p>{menuData.name}</p>
        <div
          className="rightClick-menu"
          style={{ display: isRightClicked ? `block` : `none` }}
        >
          <ul className="right-click-list">
            <li onClick={() => data.addMenuItem(props.id)}>Add Child</li>
            <li onClick={() => data.deleteMenuItem(props.id)}>Delete</li>
            <li onClick={() => data.renameMenuItem(props.id)}>Rename</li>
          </ul>
        </div>
      </div>
      {menuData.submenus.map((currentChildId) => {
        const isOpenChild = utils.getMenuItemById(
          currentChildId,
          data.dataStracture
        ).isOpen;
        if (isOpenChild)
          return (
            <Menu
              id={currentChildId}
              key={currentChildId}
              margin={props.margin + 35}
            ></Menu>
          );
      })}
    </>
  );
}
