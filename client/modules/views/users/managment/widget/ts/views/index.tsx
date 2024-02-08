import * as React from 'react';
import { Form } from './form';
import { IContext, UsersManagementContext } from '../context';

export /*bundle*/
function View({ store }) {
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
