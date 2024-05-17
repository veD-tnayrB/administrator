import React from 'react';
import { RightSection } from './components/right-section';
import { LeftSection } from './components/left-section';
import { IContext, LoginContext } from './context';
import { StoreManager } from '../store';

export /*bundle*/
	function View({ store }: { store: StoreManager }) {
	const contextValue: IContext = {
		store,
	};
	return (
		<LoginContext.Provider value={contextValue}>
			<div className="login-view auth-view">
				<LeftSection />
				<RightSection />
			</div>
		</LoginContext.Provider>
	);
}
