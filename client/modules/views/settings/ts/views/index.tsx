import * as React from 'react';
import { StoreManager } from '../store';
import { WidgetSettings } from '../widgets/index.widget.settings';
import { IContext, SettingsContext } from '../context';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const contextValue: IContext = {
		store,
	};

	return (
		<SettingsContext.Provider value={contextValue}>
			<WidgetSettings />
		</SettingsContext.Provider>
	);
}
