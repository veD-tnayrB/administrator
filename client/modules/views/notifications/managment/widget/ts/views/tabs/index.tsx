import React from 'react';
import { TabsContainer, Tabs as PuiTabs, Tab, Panes } from 'pragmate-ui/tabs';
import { Profiles } from './profiles';
import { Users } from './users';
import { useNotificationsManagmentContext } from '../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export const Tabs = () => {
	const { store } = useNotificationsManagmentContext();
	const [active, setActive] = React.useState(store.currentTab);

	console.log('ACTIVE +> ', active, store.currentTab);
	useBinder([store], () => setActive(store.currentTab), ['tabs.changed']);

	const onTabsSelected = (event, index: number) => {
		store.setTab(index);
	};

	return (
		<TabsContainer onChange={onTabsSelected} active={active}>
			<PuiTabs>
				<Tab>Associated profiles</Tab>
				<Tab>Associated individual users</Tab>
			</PuiTabs>
			<Panes>
				<Profiles />
				<Users />
			</Panes>
		</TabsContainer>
	);
};
