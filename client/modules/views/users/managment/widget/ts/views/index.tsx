import * as React from 'react';
import { Form } from './form';
import { IContext, UsersManagementContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { StoreManager } from '../store';
import { NotFound } from '@essential-js/admin/components/not-found';
import { SpinnerPage } from '@essential-js/admin/components/spinner';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [isReady, setIsReady] = React.useState(store.ready);
	useBinder([store], () => setIsReady(store.ready));

	if (store.notFound) return <NotFound />;
	if (!isReady) return <SpinnerPage />;

	const contextValue: IContext = {
		store,
	};

	const editingDescription =
		'Modify existing user details, including names, surnames, email addresses, and user profiles. Manage account status (active or inactive) and reset passwords when necessary.';

	const creationDescription =
		'Create new user accounts by providing accurate information such as names, email addresses, and user profiles. Set initial passwords securely.';

	const mode = store.isCreating ? 'Users creation' : 'Users edition';
	const description = store.isCreating ? creationDescription : editingDescription;
	return (
		<UsersManagementContext.Provider value={contextValue}>
			<div className="page-container managment-page">
				<h1>{mode}</h1>
				<p>{description}</p>
				<Form />
			</div>
		</UsersManagementContext.Provider>
	);
}
