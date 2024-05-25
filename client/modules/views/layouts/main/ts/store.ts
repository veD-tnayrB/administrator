import { ReactiveModel } from '@beyond-js/reactive/model';
import { Module, Modules } from '@essential-js/admin/models';
import { session } from '@essential-js/admin/auth';
import type { IPermission } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#mode: 'dark' | 'light' = 'light';
	get mode() {
		return this.#mode;
	}

	#sidebarCollection: Modules = new Modules();
	get sidebarCollection() {
		return this.#sidebarCollection;
	}

	#collapsedKey: string = 'is-sidebar-collapsed';
	get collapsedKey() {
		return this.#collapsedKey;
	}

	#isSidebarCollapsed: boolean = JSON.parse(localStorage.getItem(this.#collapsedKey) || 'false');
	get isSidebarCollapsed() {
		return this.#isSidebarCollapsed;
	}

	set isSidebarCollapsed(value: boolean) {
		this.#isSidebarCollapsed = value;
		localStorage.setItem(this.#collapsedKey, JSON.stringify(value));
		this.triggerEvent();
		this.triggerEvent('resize');
	}

	constructor() {
		super();
		this.#loadTheme();
		session.on('user-changed', this.loadSidebarItems);
	}

	loadSidebarItems = async () => {
		try {
			this.fetching = true;
			const isSessionLoaded = session.isLogged;
			if (!isSessionLoaded) return;

			const response = await this.#sidebarCollection.load();
			if (!response.status) throw response.error;
			const userModuleIds = session.user.permissions.map((permission: IPermission) => permission.moduleId);
			const userModules = response.data.filter((module: Module) => userModuleIds.includes(module.id));

			this.#sidebarCollection.items = userModules;
		} catch (error) {
			console.error('ERROR LOADING SIDEBAR ITEMS ', error);
			return { status: false, error };
		} finally {
			this.fetching = false;
		}
	};

	changeMode = () => {
		const wasDark = this.#mode === 'dark';
		this.#mode = this.#mode === 'light' ? 'dark' : 'light';
		const container = document.querySelector('html');
		const body = document.querySelector('body');

		const theme = wasDark ? 'light' : 'dark';
		body?.setAttribute('data-beyond-mode', theme);
		container?.setAttribute('data-beyond-mode', theme);
		localStorage.setItem('theme', theme);
		this.triggerEvent('theme-changed');
	};

	#loadTheme = () => {
		const themeStorage = localStorage.getItem('theme') as 'light' | 'dark';

		if (!themeStorage) return;
		const container = document.querySelector('html');
		const body = document.querySelector('body');
		container?.setAttribute('data-beyond-mode', themeStorage);
		body?.setAttribute('data-beyond-mode', themeStorage);
		this.#mode = themeStorage;
		this.triggerEvent('theme-changed');
	};

	hide = () => {
		this.#sidebarCollection = new Modules();
	};
}

export /*bundle*/ const layoutStore = new StoreManager();
