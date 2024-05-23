import React from 'react';
import { Link } from 'pragmate-ui/link';
import { ISidebarItem } from './items';

interface IProps {
	item: ISidebarItem;
}

export const SidebarItem = ({ item }: IProps) => {
	return (
		<li className="sidebar-item p-2">
			<Link href={item.link}>
				<span>{item.label}</span>
			</Link>
		</li>
	);
};
