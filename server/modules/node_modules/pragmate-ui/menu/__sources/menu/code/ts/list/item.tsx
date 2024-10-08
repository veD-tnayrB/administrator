import React from "react";
import { Icon } from "pragmate-ui/icons";
import { routing } from "@beyond-js/kernel/routing";
import { useMenuContext } from "../context";
export const SideMenuItem = ({ item }): JSX.Element => {
  const { title, link, icon } = item;
  const { toggleMenu } = useMenuContext();
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    routing.pushState(link);
    toggleMenu();
  };
  return (
    <li className="side-menu__item">
      <a onClick={onClick}>
        <Icon icon={icon} />
        <span>{title}</span>
      </a>
    </li>
  );
};
