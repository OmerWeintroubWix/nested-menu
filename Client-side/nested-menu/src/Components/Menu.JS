import "./Menu.css";

export function Menu(props) {
  const handleLeftClick = () => {
    const id = props.menuData.id;
    props.handleLeftClick(id);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    props.handleRightClick(props.menuData.id);
  };

  return (
    <>
      <h2
        onClick={handleLeftClick}
        onContextMenu={handleRightClick}
        style={{ display: props.menuData.isOpen ? "block" : "none" }}
      >
        {props.menuData.name}
      </h2>

      {props.menuData.isOpen &&
        props.menuData.subMenus.map((currentMenu) => {
          return (
            <Menu
              handleLeftClick={props.handleLeftClick}
              menuData={currentMenu}
              key={currentMenu.id}
              handleRightClick={props.handleRightClick}
            ></Menu>
          );
        })}
    </>
  );
}
