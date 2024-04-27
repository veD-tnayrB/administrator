import React from 'react';
import { RightSection } from './components/right-section';
import { LeftSection } from './components/left-section';
import { module } from 'beyond_context';
import { useTexts } from '@essential-js/admin/helpers';
import { IContext, LoginContext } from './context';
import { StoreManager } from '../store';
import { ITexts } from './types';
import { SpinnerPage } from '@essential-js/admin/components/spinner';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts<ITexts>(module.specifier);
	if (!ready) return <SpinnerPage />;
	const contextValue: IContext = {
		texts,
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
