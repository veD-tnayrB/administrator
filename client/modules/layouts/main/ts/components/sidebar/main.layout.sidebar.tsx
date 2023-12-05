import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { SidebarHeader } from './header';
import { SidebarItem } from './item';
import { useLayoutContext } from '../../context';
import { SidebarLoading } from './loading';
import { SidebarFooter } from './footer';

export const Sidebar = () => {
	const { store } = useLayoutContext();
	const [items, setItems] = React.useState(store.sidebarCollection.items);
	const [isLoading, setIsLoading] = React.useState(store.fetching);
	const [, setTheme] = React.useState(store.mode);
	useBinder([store], () => setTheme(store.mode), 'theme-changed');

	useBinder([store], () => {
		setItems(store.sidebarCollection.items);
		setIsLoading(store.fetching);
	});

	const output = items.map(item => <SidebarItem key={item.label} {...item} />);
	const panel = isLoading ? (
		<SidebarLoading />
	) : (
		<div className="sidebar-content-container">
			<ul>{output}</ul>
			<SidebarFooter />
		</div>
	);
	return (
		<nav className="main-layout-sidebar">
			<div className="sidebar-content">
				<SidebarHeader />
				{panel}
			</div>
		</nav>
	);
};
