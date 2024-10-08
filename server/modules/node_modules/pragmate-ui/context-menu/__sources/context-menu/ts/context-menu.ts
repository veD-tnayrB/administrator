import { ReactiveModel } from '@beyond-js/reactive/model';

export class ContextMenu extends ReactiveModel<ContextMenu> {
	private _event: MouseEvent | null;

	constructor() {
		super();
		this._event = null;
		this.init();
	}

	get event(): MouseEvent | null {
		return this._event;
	}

	get currentTarget(): EventTarget | null {
		return this._event?.currentTarget || null;
	}

	get target(): EventTarget | null {
		return this._event?.target || null;
	}

	private init(): void {
		globalThis.oncontextmenu = (event: MouseEvent) => {
			this._event = event;
			const target = event.target as HTMLElement; // Assuming target is always an HTMLElement
			const parentContext = target.closest('[data-context]') as HTMLElement;

			if (target.dataset.context || parentContext) {
				event.preventDefault();
				event.stopPropagation();
				const contextEvent = target.dataset.context || parentContext?.dataset.context;
				this.triggerEvent('closed');
				if (contextEvent) {
					this.triggerEvent(`fired.${contextEvent}`);
				}
				return;
			}

			if (target.classList.contains('ds-context-menu') || target.closest('.ds-context-menu')) {
				this.triggerEvent('closed');
			}
		};
	}
}

export /*bundle */ const ContextMenuManager = new ContextMenu();
