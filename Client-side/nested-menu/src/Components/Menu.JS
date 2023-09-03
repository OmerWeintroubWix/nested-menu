import "./Menu.css";
import { useContext, useState } from "react";
import { Context } from "../App";
import utils from "../utils/utils";

export function Menu(props) {
  const data = useContext(Context);
  const handleLeftClick = data.leftClick;
  const dataStructure = data.dataStracture;
  const menuData = utils.getMenuItemById(props.id, dataStructure);
  const handleLeftClickMenuItem = () => handleLeftClick(props.id);

  const [isRightClicked, setIsRightClicked] = useState(false);

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
      >
        <p>{menuData.name}</p>
        <div
          className="rightClick-menu"
          style={{ display: isRightClicked ? `block` : `none` }}
        >
          <button>Add Child</button>
          <button>Remove</button>
          <button>Rename</button>
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
