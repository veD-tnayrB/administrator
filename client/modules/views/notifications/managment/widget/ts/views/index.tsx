import * as React from 'react';
import { Form } from './form';
import { StoreManager } from '../store';
import { IContext, NotificationsManagmentContext } from '../context';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const contextValue: IContext = {
		store,
	};

	const mode = store.isCreating ? 'Creation' : 'Edition';
	return (
		<NotificationsManagmentContext.Provider value={contextValue}>
			<div className="page-container managment-page">
				<h1>Notifications {mode}</h1>
				<Form />
			</div>
		</NotificationsManagmentContext.Provider>
	);
}
