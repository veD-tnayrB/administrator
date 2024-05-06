import React from 'react';
import { session } from '@essential-js/admin/auth';
import { SidebarItem } from './item';
import { useLayoutContext } from '../../context';
import { routing } from '@beyond-js/kernel/routing';

const ICONS = {
	theme: {
		dark: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
		light: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
	},
	logout: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>',
};

export const SidebarFooter = () => {
	const { texts, store } = useLayoutContext();

	const onLogout = () => {
		session.logout();
		routing.pushState('/auth/login');
	};

	const firstItemName = store.mode === 'dark' ? texts.lightMode : texts.darkMode;

	return (
		<footer className="sidebar-footer">
			<ul>
				<SidebarItem label={firstItemName} icon={ICONS.theme[store.mode]} onClick={store.changeMode} />
				<SidebarItem label={texts.logout} icon={ICONS.logout} onClick={onLogout} />
			</ul>
		</footer>
	);
};
