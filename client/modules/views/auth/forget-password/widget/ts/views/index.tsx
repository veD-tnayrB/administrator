import React from 'react';
import { ForgetPasswordContext, IContext } from './context';
import { StoreManager } from '../store';
import { Form } from './form';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const contextValue: IContext = {
		store,
	};
	return (
		<ForgetPasswordContext.Provider value={contextValue}>
			<div className="forget-password-view auth-view">
				<Form />
			</div>
		</ForgetPasswordContext.Provider>
	);
}
