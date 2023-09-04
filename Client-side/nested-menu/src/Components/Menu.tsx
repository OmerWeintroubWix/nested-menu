import "./Menu.css";
import React, {useContext, useState} from "react";
import {Context} from "../App";
import {getMenuItemById} from "../utils/utils";

type MenuProps = {
    id: number,
    key?: number,
    margin: number,
}
const Menu: React.FC<MenuProps> = ({id, margin}) => {
    const [isRightClicked, setIsRightClicked] = useState(false);
    const {
        data,
        leftClick,
        deleteMenuItem,
        renameMenuItem,
        addMenuItem,
    } = useContext(Context);

    const menuData = getMenuItemById(id, data);
    const handleLeftClickMenuItem = () => leftClick(id);
    const handleRightClickMenuItem = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsRightClicked((prevState) => !prevState);
    };

    return (
        <>
            <div className="menu-item-container">
                <div
                    id={`menu-id-${id}`}
                    onClick={handleLeftClickMenuItem}
                    onContextMenu={handleRightClickMenuItem}
                    className="menu-item"
                    style={{marginLeft: `${margin}px`}}
                >
                    <p>{menuData.name}</p>
                </div>
                <div
                    className="right-click-menu"
                    style={{display: isRightClicked ? `block` : `none`}}
                >
                    <ul className="right-click-list">
                        <li onClick={() => addMenuItem(id)}>Add Child</li>
                        <li onClick={() => deleteMenuItem(id)}>Delete</li>
                        <li onClick={() => renameMenuItem(id)}>Rename</li>
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
                            margin={margin + 100}
                        />
                    );
            })}
        </>
    );
}

export default Menu