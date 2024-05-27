import * as React from 'react';
import { Form } from './form';
import { IContext, UsersManagementContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { StoreManager } from '../store';
import { SpinnerPage } from '@essential-js/admin/components/spinner';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [isReady, setIsReady] = React.useState(store.ready);
	useBinder([store], () => setIsReady(store.ready));

	if (!isReady) return <SpinnerPage />;

	const contextValue: IContext = {
		store,
	};

	return (
		<UsersManagementContext.Provider value={contextValue}>
			<div className="page-container managment-page">
				<h1>{store.item.fullName}</h1>
				<Form />
			</div>
		</UsersManagementContext.Provider>
	);
}
