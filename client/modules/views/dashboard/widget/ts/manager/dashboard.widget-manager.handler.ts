import type React from 'react';
import { ReactiveModel } from '@beyond-js/reactive/model';

export interface IWidget {
	identifier: string;
	order: number;
	active: boolean;
	metadata: string;
}

class WidgetStore extends ReactiveModel<WidgetStore> {
	#widgets: Map<string, React.ComponentType<{ metadata: any }>> = new Map();
	get widgets() {
		return this.#widgets;
	}

	defineWidgets = (widgets: { [key: string]: React.ComponentType<{ metadata: any }> }[]) => {
		const map = new Map<string, React.ComponentType<{ metadata: any }>>();
		widgets.forEach(widget => {
			Object.keys(widget).forEach(key => {
				map.set(key, widget[key]);
			});
		});
		this.#widgets = map;
	};
}

export const widgetStore = new WidgetStore();
