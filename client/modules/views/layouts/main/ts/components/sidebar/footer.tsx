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
	widget: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-proportions"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M12 9v11"/><path d="M2 9h13a2 2 0 0 1 2 2v9"/></svg>',
};

export const SidebarFooter = () => {
	const { store } = useLayoutContext();

	const onLogout = () => {
		session.logout();
		routing.pushState('/auth/login');
	};

	const onOpenSettings = () => {
		store.isSettingsOpen = true;
	};

	const firstItemName = store.mode === 'dark' ? 'Light mode' : 'Dark mode';

	return (
		<footer className="sidebar-footer">
			<ul>
				<SidebarItem label="Widgets" icon={ICONS.widget} onClick={onOpenSettings} />
				<SidebarItem label={firstItemName} icon={ICONS.theme[store.mode]} onClick={store.changeMode} />
				<SidebarItem label="Logout" icon={ICONS.logout} onClick={onLogout} />
			</ul>
		</footer>
	);
};
