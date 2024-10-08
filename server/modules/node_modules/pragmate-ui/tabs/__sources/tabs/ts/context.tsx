import React from 'react';

export interface ITabsContext {
	panes: any;
	activeTab: any;
	setActiveTab: any;
	onChange?: (event, index) => void;
}
export const TabsContext = React.createContext({} as ITabsContext);
export const useTabsContext = () => React.useContext(TabsContext);
