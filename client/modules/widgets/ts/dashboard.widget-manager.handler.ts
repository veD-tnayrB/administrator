import type React from 'react';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { TotalsWidget } from './totals/totals.dashboard.widget';
import { RegisteredUsersWidget } from './registered-users/registered-users.dashboard.widget';
import { OnlineUsersWidget } from './online-users/online-users.dashboard.widget';
import { WelcomeWidget } from './welcome/welcome.dashboard.widget';

type IWidgetComponent = React.FC<{}>;

export interface IWidget {
	identifier: string;
	order: number;
	active: boolean;
	metadata: string;
}

export class WidgetStore extends ReactiveModel<WidgetStore> {
	#widgets: Map<string, IWidgetComponent> = new Map();
	get widgets() {
		return this.#widgets;
	}

	defineWidgets = (widgets: { [key: string]: IWidgetComponent }[]) => {
		const map = new Map<string, IWidgetComponent>();
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
