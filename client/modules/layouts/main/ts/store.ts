import { ReactiveModel } from '@beyond-js/reactive/model';
import { Module, Modules } from '@essential-js/admin/models';

export class StoreManager extends ReactiveModel<StoreManager> {
	#mode: 'dark' | 'light' = 'light';
	get mode() {
		return this.#mode;
	}

	#sidebarCollection: Modules = new Modules();
	get sidebarCollection() {
		return this.#sidebarCollection;
	}

	constructor() {
		super();
		this.#loadTheme();
	}

	loadSidebarItems = async () => {
		try {
			this.fetching = true;
			const response = await this.#sidebarCollection.load();
			if (!response.status) throw response.error;
			this.#sidebarCollection.items.sort((a: Module, b: Module) => a.order - b.order);
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
		body.setAttribute('data-beyond-mode', theme);
		container.setAttribute('data-beyond-mode', theme);
		localStorage.setItem('theme', theme);
		this.triggerEvent('theme-changed');
	};

	#loadTheme = () => {
		const themeStorage = localStorage.getItem('theme') as 'light' | 'dark';

		if (!themeStorage) return;
		const container = document.querySelector('html');
		const body = document.querySelector('body');
		container.setAttribute('data-beyond-mode', themeStorage);
		body.setAttribute('data-beyond-mode', themeStorage);
		this.#mode = themeStorage;
		this.triggerEvent('theme-changed');
	};
}
