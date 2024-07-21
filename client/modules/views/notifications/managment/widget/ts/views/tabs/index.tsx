import React from 'react';
import { TabsContainer, Tabs as PuiTabs, Tab, Panes } from 'pragmate-ui/tabs';
import { Profiles } from './profiles';
import { Users } from './users';
import {
	CollapsibleContainer,
	CollapsibleHeader,
	CollapsibleContent,
} from '@essential-js/admin/components/collapsible';
import { useNotificationsManagmentContext } from '../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export const Tabs = () => {
	const { store } = useNotificationsManagmentContext();
	const [active, setActive] = React.useState(store.currentTab);

	useBinder([store], () => setActive(store.currentTab), ['tabs.changed']);

	React.useEffect(() => {
		store.loadAssociations();
	}, []);

	const onTabsSelected = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
		store.setTab(index);
	};

	const panes = [
		{ tab: 'profiles', content: '' },
		{ tab: 'users', content: '' },
	];

	return (
		<CollapsibleContainer>
			<CollapsibleHeader>
				<h2>Associations</h2>
			</CollapsibleHeader>
			<CollapsibleContent>
				<TabsContainer onChange={onTabsSelected} panes={panes} active={active}>
					<PuiTabs className="tabs">
						<Tab>Associated profiles</Tab>
						<Tab>Associated individual users</Tab>
					</PuiTabs>
					<Panes className="panes ">
						<Profiles />
						<Users />
					</Panes>
				</TabsContainer>
			</CollapsibleContent>
		</CollapsibleContainer>
	);
};
