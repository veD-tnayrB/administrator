import React from 'react';
import { Link } from 'pragmate-ui/link';
import { routing } from '@beyond-js/kernel/routing';
import type { IModule } from '@essential-js/admin/models';
import Tippy from '@tippyjs/react';
import { Placement } from 'tippy.js';
import { useLayoutContext } from '../../context';

interface IProps extends Partial<IModule> {
	to?: string;
	onClick: () => void;
	icon: string;
	label: string;
}

export const SidebarItem: React.FC<IProps> = (params) => {
	const { store } = useLayoutContext();
	const isDefaultSelected = params.to
		? routing.uri.pathname.includes(params.to) || routing.uri.pathname === params.to
		: false;
	const [isSelected, setIsSelected] = React.useState(isDefaultSelected);

	React.useEffect(() => {
		const onChange = () => {
			const value = params.to
				? routing.uri.pathname.includes(params.to) || routing.uri.pathname === params.to
				: false;
			setIsSelected(value);
		};
		routing.on('change', onChange);
		return () => {
			routing.off('change', onChange);
		};
	}, []);

	const Container = params.to ? Link : 'button';
	const properties = params.to
		? { href: params.to, className: 'sidebar-item-link' }
		: { className: 'sidebar-item-button' };

	const cls = isSelected ? 'selected' : '';

	const Tooltip = !store.isSidebarCollapsed ? React.Fragment : Tippy;
	const props = !store.isSidebarCollapsed ? {} : { content: params.label, placement: 'right' as Placement };
	return (
		<Tooltip {...props}>
			<li className={`sidebar-item ${cls}`}>
				<Container
					data-placement="right"
					onClick={params.onClick}
					{...properties}
					className={`sidebar-item-link ${properties.className}`}
				>
					<div className="icon" dangerouslySetInnerHTML={{ __html: params.icon }} />
					<span>{params.label}</span>
				</Container>
			</li>
		</Tooltip>
	);
};
