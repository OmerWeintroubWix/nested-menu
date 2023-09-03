import "./Menu.css";
import { useContext, useState } from "react";
import { Context } from "../App";
import utils from "../utils/utils";

export function Menu(props) {
  const [isRightClicked, setIsRightClicked] = useState(false);
  const data = useContext(Context);
  //From Context
  //1.The data stracture
  const dataStructure = data.dataStracture;
  //2.handle left click
  const handleLeftClick = data.leftClick;
  //3.handle remove
  const handleRemove = data.deleteMenuItem;

  //Get the object that represent that menuItem
  const menuData = utils.getMenuItemById(props.id, dataStructure);

  const handleLeftClickMenuItem = () => handleLeftClick(props.id);

  const handleRightClickMenuItem = (e) => {
    e.preventDefault();
    setIsRightClicked((prevState) => !prevState);
  };

  const deleteMenuItem = () => handleRemove(props.id);

  return (
    <>
      <div
        id={`menu-id-${props.id}`}
        onClick={handleLeftClickMenuItem}
        onContextMenu={handleRightClickMenuItem}
        className="menu-item"
      >
        <p>{menuData.name}</p>
        <div
          className="rightClick-menu"
          style={{ display: isRightClicked ? `block` : `none` }}
        >
          <ul className="right-click-list">
            <li>Add Child</li>
            <li onClick={deleteMenuItem}>Remove</li>
            <li>Rename</li>
          </ul>
        </div>
      </div>
      {menuData.submenus.map((currentChildId) => {
        const isOpenChild = utils.getMenuItemById(
          currentChildId,
          dataStructure
        ).isOpen;
        if (isOpenChild)
          return <Menu id={currentChildId} key={currentChildId}></Menu>;
      })}
    </>
  );
}
