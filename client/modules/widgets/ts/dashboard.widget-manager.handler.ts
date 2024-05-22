import type React from 'react';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { TotalsWidget } from './totals/totals.dashboard.widget';
import { RegisteredUsersWidget } from './registered-users/registered-users.dashboard.widget';
import { OnlineUsersWidget } from './online-users/online-users.dashboard.widget';
import { WelcomeWidget } from './welcome/welcome.dashboard.widget';

export interface IWidget {
	identifier: string;
	order: number;
	active: boolean;
	metadata: string;
}

export class WidgetStore extends ReactiveModel<WidgetStore> {
	#widgets: Map<string, React.ForwardRefExoticComponent<{ metadata: any }> | React.ComponentType<{ metadata: any }>> =
		new Map();
	get widgets() {
		return this.#widgets;
	}

	defineWidgets = (widgets: { [key: string]: React.ComponentType<{ metadata: any }> }[]) => {
		const map = new Map<string, React.ComponentType<{ metadata: any }>>();
		widgets.forEach((widget) => {
			Object.keys(widget).forEach((key) => {
				map.set(key, widget[key]);
			});
		});
		this.#widgets = map;
	};
}

export /*bundle*/ const widgetStore = new WidgetStore();

widgetStore.defineWidgets([
	{
		totals: TotalsWidget,
		'registered-users': RegisteredUsersWidget,
		'online-users': OnlineUsersWidget,
		welcome: WelcomeWidget,
	},
]);
