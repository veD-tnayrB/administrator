import React, { useState, useEffect } from "react";
import { SideMenuContent } from "./content";
import { IconButton } from "pragmate-ui/icons";
import { MenuContext } from "./context";
export /*bundle*/ const Menu = ({ items, title }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContext.Provider value={{ isOpen, items, toggleMenu }}>
      <IconButton onClick={toggleMenu} icon="menu" />
      <SideMenuContent title={title} />
      {isOpen && <div onClick={toggleMenu} className="background-black" />}
    </MenuContext.Provider>
  );
};
