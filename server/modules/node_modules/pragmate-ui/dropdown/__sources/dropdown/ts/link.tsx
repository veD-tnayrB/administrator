import React from "react";
import { useDropdownContext } from "./context";

interface props {
  className?: string;
  onClick?: Function;
  tag?: string;
  id?: string;
}
export /*bundle*/ function DropdownLink(
  props: React.PropsWithChildren<props>
): JSX.Element {
  const { setShowMenu } = useDropdownContext();
  const { children, className, onClick, tag, id } = props;
  const handleClick = async (event: React.MouseEvent): Promise<void> => {
    event.stopPropagation();
    if (!!onClick && typeof onClick === "function") await onClick(event);
    setShowMenu(false);
  };
  const TagLink: any = tag ?? "div";
  const cls: string = `${className ?? ""} dropdown-link`;
  const properties : props = Object.assign({}, props);
  delete properties.className;
  delete properties.onClick;
  delete properties.tag;
  delete properties.id;
  return (
    <TagLink id={id} className={cls} onClick={handleClick} {...properties}>
      {children}
    </TagLink>
  );
}
