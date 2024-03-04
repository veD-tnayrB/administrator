import React from 'react';
import { MenuItem } from './item';

export const MenuList = ({ items }): JSX.Element => {

    const output: JSX.Element[] = items.map((item): JSX.Element => (
        <MenuItem key={item.icon} item={item} />
    ))
    return (
        <ul className="pull-down-menu__list">
            {output}
        </ul>
    );
}