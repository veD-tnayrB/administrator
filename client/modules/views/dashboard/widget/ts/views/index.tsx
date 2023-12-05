import * as React from 'react';
import { StoreManager } from '../store';
import { DashboardContext, IContext } from '../context';
import { module } from 'beyond_context';
import { useTexts } from '@essential-js/admin/helpers';
import { WidgetManager } from '../manager/dashboard.widget-manager';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { widgetStore } from '../manager/dashboard.widget-manager.handler';
import { TotalsWidget } from '../widgets/totals/totals.dashboard.widget';
import { RegisteredUsersWidget } from '../widgets/registered-users/registered-users.dashboard.widget';
import { OnlineUsersWidget } from '../widgets/online-users/online-users.dashboard.widget';
import { WelcomeWidget } from '../widgets/welcome/welcome.dashboard.widget';

widgetStore.defineWidgets([
	{
		totals: TotalsWidget,
		'registered-users': RegisteredUsersWidget,
		'online-users': OnlineUsersWidget,
		welcome: WelcomeWidget,
	},
]);

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts(module.specifier);
	const [data, setData] = React.useState(store.collection.items);

	useBinder([store], () => setData(store.collection.items));

	if (!ready) return null;
	const contextValue: IContext = {
		store,
		texts,
	};
	return (
		<DashboardContext.Provider value={contextValue}>
			<WidgetManager data={data} />
		</DashboardContext.Provider>
	);
}
