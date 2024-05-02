import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { SidebarHeader } from './header';
import { SidebarItem } from './item';
import { useLayoutContext } from '../../context';
import { SidebarLoading } from './loading';
import { SidebarFooter } from './footer';
import { session } from '@essential-js/admin/auth';

export const Sidebar = () => {
	const { store } = useLayoutContext();
	const [items, setItems] = React.useState(store.sidebarCollection.items);
	const [isLoading, setIsLoading] = React.useState(store.fetching);
	const [theme, setTheme] = React.useState(store.mode);
	useBinder([store], () => setTheme(store.mode), ['theme-changed']);

	useBinder([store], () => {
		setItems(store.sidebarCollection.items);
		setIsLoading(store.fetching);
	});

	items.sort((a, b) => a.order - b.order);

	const output = items.map((item) => <SidebarItem key={item.label} {...item} />);
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
				<SidebarHeader theme={theme} />
				{panel}
			</div>
		</nav>
	);
};
