import * as React from 'react';
import { Form } from './form';
import { StoreManager } from '../store';
import { useTexts } from '@essential-js/admin/helpers';
import { module } from 'beyond_context';
import { IContext, NotificationsManagmentContext } from '../context';
import { ITexts } from '../types';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	if (!store.ready) return null;

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
