import * as React from 'react';
import { Form } from './form';
import { IContext, UsersManagementContext } from '../context';
import { useTexts } from '@essential-js/admin/helpers';
import { module } from 'beyond_context';

export /*bundle*/
function View({ store }) {
	const [ready, texts] = useTexts(module.specifier);

	if (!ready) return null;

	const contextValue: IContext = {
		store,
		texts,
	};
	return (
		<UsersManagementContext.Provider value={contextValue}>
			<div className="page-container">
				<Form />
			</div>
		</UsersManagementContext.Provider>
	);
}
