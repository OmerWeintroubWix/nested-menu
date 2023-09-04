import "./Menu.css";
import {useContext, useState} from "react";
import {Context} from "../App";
import {getMenuItemById, handleLeftClick} from "../utils/utils";

export function Menu(props) {
  const [isRightClicked, setIsRightClicked] = useState(false);
  const {
    data,
    leftClick,
    deleteMenuItem,
    renameMenuItem,
    addMenuItem,
  } = useContext(Context);

  const menuData = getMenuItemById(props.id, data);
  const handleLeftClickMenuItem = () => leftClick(props.id);
  const handleRightClickMenuItem = (e) => {
    e.preventDefault();
    setIsRightClicked((prevState) => !prevState);
  };

  return (
    <>
      <div
        id={`menu-id-${props.id}`}
        onClick={handleLeftClickMenuItem}
        onContextMenu={handleRightClickMenuItem}
        className="menu-item"
        style={{ marginLeft: `${props.margin}px` }}
      >
        <p>{menuData.name}</p>
        <div
          className="rightClick-menu"
          style={{ display: isRightClicked ? `block` : `none` }}
        >
          <ul className="right-click-list">
            <li onClick={() => addMenuItem(props.id)}>Add Child</li>
            <li onClick={() => deleteMenuItem(props.id)}>Delete</li>
            <li onClick={() => renameMenuItem(props.id)}>Rename</li>
          </ul>
        </div>
      </div>
      {menuData.submenus.map((currentChildId) => {
        const isOpenChild = getMenuItemById(
          currentChildId,
          data
        ).isOpen;
        if (isOpenChild)
          return (
            <Menu
              id={currentChildId}
              key={currentChildId}
              margin={props.margin + 20}
            />
          );
      })}
    </>
  );
}
