import React from 'react';
import { IContext, RecoverPasswordContext } from './context';
import { StoreManager } from '../store';
import { Form } from './form';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const contextValue: IContext = {
		store,
	};
	return (
		<RecoverPasswordContext.Provider value={contextValue}>
			<div className="forget-password-view auth-view">
				<Form />
			</div>
		</RecoverPasswordContext.Provider>
	);
}
