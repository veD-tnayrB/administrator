import React from 'react';
import { TabsContext } from './context';
import { ITabProps } from './interfaces';

export /* bundle  */ const TabsContainer: React.FC<ITabProps> = ({ active, onChange, className, children, panes }) => {
	const activeIndex = active || 0;
	const [activeTab, setActiveTab] = React.useState(activeIndex);
	const value = { panes, activeTab, setActiveTab, onChange };

	const cls = `pui-tabs-container${className ? ` ${className}` : ''}`;
	return (
		<TabsContext.Provider value={value}>
			<section className={cls}>{children}</section>
		</TabsContext.Provider>
	);
};
