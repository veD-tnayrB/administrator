// SidebarItem.tsx
import React from 'react';
import { Link } from 'pragmate-ui/link';
import { routing } from '@beyond-js/kernel/routing';

interface SidebarItemProps {
	icon: string;
	label: string;
	to: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to }) => {
	const [isSelected, setIsSelected] = React.useState(routing.uri.pathname === to);
	React.useEffect(() => {
		routing.on('change', () => {
			setIsSelected(routing.uri.pathname === to);
		});
	}, []);

	const cls = isSelected ? 'selected' : '';

	return (
		<li className={`sidebar-item ${cls}`}>
			<Link className="sidebar-item-link" href={to}>
				<div className="icon" dangerouslySetInnerHTML={{ __html: icon }} />
				<span>{label}</span>
			</Link>
		</li>
	);
};
