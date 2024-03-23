import React, { useState } from 'react';
import { CollapsibleContainer, CollapsibleHeader, CollapsibleContent } from 'pragmate-ui/collapsible';
import { TabsContainer, Tabs as PuiTabs, Tab, Panes } from 'pragmate-ui/tabs';
import { Daily } from './daily/daily';
import { Weekly } from './weekly/weekly';
import { Monthly } from './monthly';

enum Sections {
	DAILY = 0,
	WEEKLY = 1,
	MONTHLY = 2,
	ANNUALLY = 3,
}

export const Frecuency = () => {
	const [selected, setSelected] = useState<Sections>(Sections.DAILY);

	const onRRulesGenerated = value => {
		console.log('RULE RULE => ', value);
	};

	const onTabsSelected = (event, index: number) => {
		setSelected(index);
	};

	return (
		<CollapsibleContainer>
			<CollapsibleHeader>
				<h3>Frecuency</h3>
			</CollapsibleHeader>
			<CollapsibleContent>
				<TabsContainer onChange={onTabsSelected} active={selected}>
					<PuiTabs>
						<Tab>Daily</Tab>
						<Tab>Weekly</Tab>
						<Tab>Monthly</Tab>
						<Tab>Annually</Tab>
					</PuiTabs>
					<Panes className="py-6 flex-col gap-4">
						<Daily onRRulesGenerated={onRRulesGenerated} />
						<Weekly onRRulesGenerated={onRRulesGenerated} />
						<Monthly onRRulesGenerated={onRRulesGenerated} />
					</Panes>
				</TabsContainer>
			</CollapsibleContent>
		</CollapsibleContainer>
	);
};
