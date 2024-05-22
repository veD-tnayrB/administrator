import * as React from 'react';
import { StoreManager } from '../store';
import { DashboardContext, IContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { WidgetManager } from '@essential-js/admin/widgets';
import { SpinnerPage } from '@essential-js/admin/components/spinner';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [data, setData] = React.useState(store.collection.items);
	const [ready, setReady] = React.useState(store.ready);
	useBinder([store], () => {
		setData(store.collection.items);
		setReady(store.ready);
	});

	if (!ready) return <SpinnerPage />;
	const contextValue: IContext = {
		store,
	};
	return (
		<DashboardContext.Provider value={contextValue}>
			<WidgetManager data={data} />
		</DashboardContext.Provider>
	);
}
