import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { SidebarHeader } from './header';
import { SidebarItem } from './item';
import { useLayoutContext } from '../context';

export const Sidebar = () => {
	const { store } = useLayoutContext();
	const [items, setItems] = React.useState(store.sidebarCollection.items);

	useBinder([store], () => setItems(store.sidebarCollection.items));

	const output = items.map(item => <SidebarItem key={item.label} {...item} />);
	return (
		<nav className="main-layout-sidebar">
			<div className="sidebar-content">
				<SidebarHeader />
				<ul>{output}</ul>
			</div>
		</nav>
	);
};
