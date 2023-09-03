import "./Menu.css";
import { useContext } from "react";
import { Context } from "../App";

const bringMenuItemById = (menuId, dataStracture) =>
  dataStracture.filter((currentMenuItem) => menuId === currentMenuItem.id)[0];

export function Menu(props) {
  const data = useContext(Context);
  const dataStructure = data.dataStracture;
  const itemStracure = bringMenuItemById(props.id, dataStructure);
  return (
    <>
      <div id={`menu-id-${props.id}`}>
        <p>{itemStracure.isOpen && itemStracure.name}</p>
      </div>
      {itemStracure.subMenus.map((currentChildId) => (
        <Menu id={currentChildId} key={currentChildId}></Menu>
      ))}
    </>
  );
}
