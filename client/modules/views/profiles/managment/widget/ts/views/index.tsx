import * as React from 'react';
import { Form } from './form';
import { StoreManager } from '../store';
import { useTexts } from '@essential-js/admin/helpers';
import { module } from 'beyond_context';
import { IContext, ProfilesManagmentContext } from '../context';
import { ITexts } from '../types';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts<ITexts>(module.specifier);

	if (!ready) return null;

	const contextValue: IContext = {
		store,
		texts,
	};

	const mode = store.isCreating ? 'creating' : 'editing';
	return (
		<ProfilesManagmentContext.Provider value={contextValue}>
			<div className="page-container managment-page">
				<h1>{texts.title[mode]}</h1>
				<Form />
			</div>
		</ProfilesManagmentContext.Provider>
	);
}
