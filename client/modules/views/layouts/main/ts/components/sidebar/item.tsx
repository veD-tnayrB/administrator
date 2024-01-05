// SidebarItem.tsx
import React from 'react';
import { Link } from 'pragmate-ui/link';
import { routing } from '@beyond-js/kernel/routing';
import { Module } from '@essential-js/admin/models';
import { useLayoutContext } from '../../context';

interface IProps extends Module {
	to?: string;
	onClick: () => void;
	icon: string;
	label: string;
}

export const SidebarItem: React.FC<IProps> = params => {
	const { store } = useLayoutContext();
	const [isSelected, setIsSelected] = React.useState(
		routing.uri.pathname.includes(params.to) || routing.uri.pathname === params.to
	);
	React.useEffect(() => {
		routing.on('change', () => {
			setIsSelected(routing.uri.pathname.includes(params.to));
		});
	}, []);

	const Container = params.to ? Link : 'button';
	const properties = params.to
		? { href: params.to, className: 'sidebar-item-link' }
		: { className: 'sidebar-item-button' };

	const cls = isSelected ? 'selected' : '';

	return (
		<li className={`sidebar-item ${cls}`}>
			<Container className="sidebar-item-link" onClick={params.onClick} {...properties}>
				<div className="icon" dangerouslySetInnerHTML={{ __html: params.icon }} />
				<span>{params.label}</span>
			</Container>
		</li>
	);
};
