import * as React from 'react';
import { StoreManager } from '../store';
import { IContext, SettingsContext } from '../context';
import { Sidebar } from '../components/sidebar/index.settings.sidebar';
import { Content } from './content';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const contextValue: IContext = {
		store,
	};

	return (
		<SettingsContext.Provider value={contextValue}>
			<div className="flex items-center">
				<Sidebar />
				<Content />
			</div>
		</SettingsContext.Provider>
	);
}
