// SidebarItem.tsx
import React from 'react';
import { Link } from 'pragmate-ui/link';
import { routing } from '@beyond-js/kernel/routing';
import { Module } from '@essential-js/admin/models';
import { useLayoutContext } from '../../context';

export const SidebarItem: React.FC<Module> = params => {
	const { store } = useLayoutContext();
	const [isSelected, setIsSelected] = React.useState(routing.uri.pathname === params.to);
	React.useEffect(() => {
		routing.on('change', () => {
			setIsSelected(routing.uri.pathname === params.to);
		});
	}, []);

	const cls = isSelected ? 'selected' : '';
	const icon = store.mode === 'dark' ? params.iconDarkMode : params.iconLightMode;

	return (
		<li className={`sidebar-item ${cls}`}>
			<Link className="sidebar-item-link" href={params.to}>
				<div className="icon" dangerouslySetInnerHTML={{ __html: icon }} />
				<span>{params.label}</span>
			</Link>
		</li>
	);
};
