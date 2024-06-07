import React from 'react';
import { SpinnerPage } from '@essential-js/admin/components/spinner';
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

	if (!ready) return <SpinnerPage />;

	const mode = store.isCreating ? 'creation' : 'edition';
	const creating =
		'Create new notifications by specifying the title, description, and execution frequency. Associate notifications with multiple profiles or individual users as needed.';
	const editing =
		'Edit notifications by specifying the new title, description, and execution frequency. Associate notifications with multiple profiles or individual users as needed.';

	const description = mode === 'creation' ? creating : editing;

	return (
		<NotificationsManagmentContext.Provider value={contextValue}>
			<div className="page-container managment-page">
				<h1>Notifications {mode}</h1>
				<p>{description}</p>
				<Form />
			</div>
		</NotificationsManagmentContext.Provider>
	);
}
