import React from 'react';
import { Form } from './form';
import { StoreManager } from '../store';
import { IContext, NotificationsManagmentContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, setReady] = React.useState(store.ready);
	const contextValue: IContext = {
		store,
	};

	useBinder([store], () => setReady(store.ready));

	if (!ready) return null;

	const mode = store.isCreating ? 'creation' : 'edition';
	return (
		<NotificationsManagmentContext.Provider value={contextValue}>
			<div className="page-container managment-page">
				<h1>Notifications {mode}</h1>
				<Form />
			</div>
		</NotificationsManagmentContext.Provider>
	);
}
