import React from "react";
import { Icon } from "pragmate-ui/icons";

export const MenuItem = ({ item }): JSX.Element => {
  const { title, link, icon } = item;
  return (
    <li className="pull-down-menu__item">
      <Icon icon={icon} />
      <a href={link}>{title}</a>
    </li>
  );
};
