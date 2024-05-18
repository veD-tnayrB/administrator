import React from 'react';
import { Image } from 'pragmate-ui/image';
import { Button } from 'pragmate-ui/components';
import config from '@essential-js/admin/config';
import { useLayoutContext } from '../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

interface IProps {
	theme: string;
}

export const SidebarHeader = ({ theme }: IProps) => {
	const { store } = useLayoutContext();
	const [isColappsed, setIsCollapsed] = React.useState(store.isSidebarCollapsed);
	const name = config.params.application.company.name;

	useBinder([store], () => setIsCollapsed(store.isSidebarCollapsed))


	const iconUrl = theme === 'dark' ? '/assets/sidebar/logo-dark.svg' : '/assets/sidebar/logo-light.svg';

	const toggleCollapse = () => {
		store.isSidebarCollapsed = !store.isSidebarCollapsed;
	}

	const collapsedCls = isColappsed ? 'collapsed' : '';

	return (
		<header className="flex items-center justify-between">
			<div className="identifier">
				<div className="logo-container">
					<Image src={iconUrl} className="logo" />
				</div>
				<h1>{name}</h1>
			</div>

			<div className="collapsible-container">
				<Button onClick={toggleCollapse} className={`collapse-btn ${collapsedCls}`}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>

				</Button>
			</div>

		</header>
	);
};
