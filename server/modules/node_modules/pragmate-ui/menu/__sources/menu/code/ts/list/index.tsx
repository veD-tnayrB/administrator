import React from 'react';
import { useMenuContext } from '../context';
import { SideMenuItem } from './item';

export const SideMenuList = (): JSX.Element => {
    const { items } = useMenuContext();
    const output: JSX.Element[] = items.map((item): JSX.Element => (
        <SideMenuItem key={item.icon} item={item} />
    ))
    return (
        <ul className="side-menu__list">
            {output}
        </ul>
    );
}