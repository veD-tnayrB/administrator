import React from 'react';
import { items } from './items';
import { SidebarItem } from './item';

export const Sidebar = () => {
	const output = items.map((item) => <SidebarItem key={item.label} item={item} />);
	return (
		<aside className="w-60 bg-surface settings-sidebar">
			<nav className="w-full min-h-screen px-2 py-4">
				<ul>{output}</ul>
			</nav>
		</aside>
	);
};
