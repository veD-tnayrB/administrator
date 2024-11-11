import React from "react";
import { SideMenuList } from "./list";
import { IconButton } from "pragmate-ui/icons";
import { Image } from "pragmate-ui/image";
import { useMenuContext } from "./context";
export const SideMenuContent = ({ title }): JSX.Element => {
  const { toggleMenu, isOpen } = useMenuContext();
  const cls: string = isOpen
    ? "side-menu__content"
    : "side-menu__content__hide side-menu__content";

  const defaultTitle = title ?? "Title";
  return (
    <div className={cls}>
      <IconButton
        icon="close"
        className="side-menu__toggle"
        onClick={toggleMenu}
      />
      <header>
        {/* <div className="image-menu">
          <Image src={`${globalThis.baseDir}assets/dummy.svg`} alt=" " />
        </div> */}
        <span>{defaultTitle}</span>
      </header>
      <SideMenuList />
    </div>
  );
};
