import "./Menu.css";
import { useContext, useState } from "react";
import { Context } from "../App";
import utils from "../utils/utils";

export function Menu(props) {
  const data = useContext(Context);
  const handleLeftClick = data.leftClick;
  const handleRemove = data.deleteMenuItem;
  const dataStructure = data.dataStracture;
  const menuData = utils.getMenuItemById(props.id, dataStructure);
  const handleLeftClickMenuItem = () => handleLeftClick(props.id);

  const [isRightClicked, setIsRightClicked] = useState(false);

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
            <li onClick={handleRemove}>Remove</li>
            <li>Rename</li>
          </ul>
        </div>
      </div>
      {menuData.subMenus.map((currentChildId) => {
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
