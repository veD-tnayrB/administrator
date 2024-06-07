import * as React from 'react';
import { Form } from './form';
import { IContext, ModulesManagmentContext } from '../context';
import { StoreManager } from '../store';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [item, setItem] = React.useState(store.item.getProperties());

	const contextValue: IContext = {
		store,
		item,
		setItem,
	};

	const editingDescription =
		'Modify existing user details, including names, surnames, email addresses, and user profiles. Manage account status (active or inactive) and reset passwords when necessary.';

	const creationDescription =
		'Allows you to create new modules, configure their URLs, associate icons, and define available actions within each module. Once changes are saved, actions cannot be deleted.';

	const mode = store.isCreating ? 'Modules creation' : 'Modules edition';
	const description = store.isCreating ? creationDescription : editingDescription;
	return (
		<ModulesManagmentContext.Provider value={contextValue}>
			<div className="modules-managment page-container managment-page">
				<h1>{mode}</h1>
				<p>{description}</p>
				<Form />
			</div>
		</ModulesManagmentContext.Provider>
	);
}
