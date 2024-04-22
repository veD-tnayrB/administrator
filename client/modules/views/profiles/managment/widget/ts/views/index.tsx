import * as React from 'react';
import { Form } from './form';
import { StoreManager } from '../store';
import { IContext, ProfilesManagmentContext } from '../context';
import { SpinnerPage } from '@essential-js/admin/components/spinner';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, setReady] = React.useState(false);

	useBinder([store], () => setReady(store.ready));

	if (!ready) return <SpinnerPage />;

	const contextValue: IContext = {
		store,
	};
	const mode = store.isCreating ? 'Profile creation' : 'Profile edition';

	return (
		<ProfilesManagmentContext.Provider value={contextValue}>
			<div className="page-container managment-page">
				<h1>{mode}</h1>
				<Form />
			</div>
		</ProfilesManagmentContext.Provider>
	);
}
