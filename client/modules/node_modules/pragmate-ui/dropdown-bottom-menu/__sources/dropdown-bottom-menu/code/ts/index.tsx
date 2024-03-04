import React from "react";
import { Image } from "pragmate-ui/image";
import { MenuList } from "./list";

export /*bundle*/ function DropdownBottomMenu({
  handleClick,
  show,
  items,
  children,
  isImage,
  title,
}): JSX.Element {
  const cls: string = show
    ? "pull-down-menu"
    : "pull-down-menu pull-down-menu__hide";
  const isItems: boolean = !!items && Array.isArray(items);
  return (
    <>
      <div className={cls}>
        {(title || isImage) && (
          <header>
            {isImage && (
              <div className="image-menu">
                <Image src={`${globalThis.baseDir}assets/dummy.svg`} alt=" " />
              </div>
            )}
            {title && <span>{title}</span>}
          </header>
        )}
        {isItems && <MenuList items={items} />}
        {children}
      </div>
      {show && <div onClick={handleClick} className="background-black" />}
    </>
  );
}
