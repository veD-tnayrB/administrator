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
	const [theme, setTheme] = React.useState(store.mode);
	const [isCollapsed, setIsCollapsed] = React.useState(store.isSidebarCollapsed);
	useBinder([store], () => setTheme(store.mode), ['theme-changed']);

	useBinder([store], () => {
		setItems(store.sidebarCollection.items);
		setIsLoading(store.fetching);
		setIsCollapsed(store.isSidebarCollapsed);
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

	const collapsedCls = isCollapsed ? 'collapsed' : '';
	return (
		<nav className={`main-layout-sidebar ${collapsedCls}`}>
			<div className="sidebar-content">
				<SidebarHeader theme={theme} />
				{panel}
			</div>
		</nav>
	);
};
