import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { SidebarHeader } from './header';
import { SidebarItem } from './item';
import { useLayoutContext } from '../../context';
import { SidebarLoading } from './loading';

export const Sidebar = () => {
	const { store } = useLayoutContext();
	const [items, setItems] = React.useState(store.sidebarCollection.items);
	const [isLoading, setIsLoading] = React.useState(store.fetching);

	useBinder([store], () => {
		setItems(store.sidebarCollection.items);
		setIsLoading(store.fetching);
	});

	const output = items.map(item => <SidebarItem key={item.label} {...item} />);
	const panel = isLoading ? <SidebarLoading /> : <ul>{output}</ul>;
	return (
		<nav className="main-layout-sidebar">
			<div className="sidebar-content">
				<SidebarHeader />
				{panel}
			</div>
		</nav>
	);
};
