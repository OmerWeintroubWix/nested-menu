import {BASE_URL, handleAddItem, handleDeleteItem, handleLeftClick, handleRenameItem} from "../utils/utils";
import {useState, useEffect} from 'react'

const useMenu = () => {
    const [data, setData] = useState(null);
    const bringAllMenus = async () => {
        try {
            const menusResponse = await fetch(BASE_URL);
            const menusJson = await menusResponse.json();
            if (menusJson) {
                const completedMenus = menusJson.map((currentMenu, index) => {
                    const currentItem = {...currentMenu};
                    if (index === 0) currentItem.isOpen = true;
                    else currentItem.isOpen = false;
                    return currentItem;
                });
                setData(completedMenus);
            } else throw new Error(`Something's wrong with JSON`);
        } catch (err) {
            console.log(err.message);
        }
    };
    useEffect(async () => {
        if (!data) {
            await bringAllMenus();
        }
    }, []);
    const leftClick = (clickedId) => {
        setData((prevData) => {
            return handleLeftClick(clickedId, prevData);
        });
    };
    const deleteMenuItem = async (menuId) => {
        const newArray = await handleDeleteItem(menuId, data);
        setData(newArray);
    };
    const renameMenuItem = async (menuId) => {
        const newName = prompt("Please enter the new name");
        const newArray = await handleRenameItem(menuId, newName, data);
        setData(newArray);
    };
    const addMenuItem = async (fatherId) => {
        const newName = prompt("Please enter the child name");
        const newArray = await handleAddItem(fatherId, newName, data);
        setData(newArray);
    };

    return {
        data,
        leftClick,
        deleteMenuItem,
        addMenuItem,
        renameMenuItem
    }
}

export default useMenu