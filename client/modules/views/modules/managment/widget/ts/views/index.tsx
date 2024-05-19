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
		setItem
	};

	const mode = store.isCreating ? 'Modules creation' : 'Modules edition';
	return (
		<ModulesManagmentContext.Provider value={contextValue}>
			<div className="page-container managment-page">
				<h1>{mode}</h1>
				<Form />
			</div>
		</ModulesManagmentContext.Provider>
	);
}
