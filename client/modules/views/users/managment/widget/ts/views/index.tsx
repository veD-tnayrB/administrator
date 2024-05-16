import * as React from 'react';
import { Form } from './form';
import { IContext, UsersManagementContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { StoreManager } from '../store';

export /*bundle*/
	function View({ store }: { store: StoreManager }) {
	const [isReady, setIsReady] = React.useState(store.ready);
	useBinder([store], () => setIsReady(store.ready));

	if (!isReady) return null;

	const contextValue: IContext = {
		store,
	};

	const mode = store.isCreating ? 'Users creation' : 'Users edition';
	return (
		<UsersManagementContext.Provider value={contextValue}>
			<div className="page-container managment-page">
				<h1>{mode}</h1>
				<Form />
			</div>
		</UsersManagementContext.Provider>
	);
}
