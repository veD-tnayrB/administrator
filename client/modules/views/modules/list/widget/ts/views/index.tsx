import * as React from 'react';
import { StoreManager } from '../store';
import { usePermissions } from '@essential-js/admin/hooks';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import {
	ListView,
	IListViewProps,
} from '@essential-js/admin/components/list-view';
import { ModulesListContext } from '../context';
import { Row } from './item';

export /*bundle*/ function View({ store }: { store: StoreManager }) {
	const [, setUpdate] = React.useState({});
	const permissions = usePermissions();
	useBinder([store], () => setUpdate({}));

	const listProperties: IListViewProps = {
		store,
		viewHeader: {
			title: 'Modules',
		},
		searchbar: {
			placeholder: 'Search...',
			filters: {
				title: 'Filter by specific column',
				actions: {
					apply: { label: 'Search' },
					reset: { label: 'Reset' },
				},
			},
		},
		header: {
			items: [
				{ label: 'ID', name: 'id' },
				{ label: 'Label', name: 'label' },
				{ label: 'Url', name: 'to' },
				{ label: 'Created at', name: 'timeCreated' },
				{ label: 'Updated at', name: 'timeUpdated' },
			],
		},
		list: {
			row: Row,
			default: true,
			itemsConfig: {
				properties: ['id', 'label', 'to', 'timeCreated', 'timeUpdated'],
			},
		},
		actions: {
			create: {
				to: '/modules/managment/create',
				label: 'Create',
			},
			columnsSelector: {
				title: 'Select the columns you want to appear',
				min: {
					label: "You can't select less than {{number}} columns",
					number: 2,
				},
			},
		},
	};

	if (!permissions.has('modules.create'))
		listProperties.actions!.create = undefined;

	const contextValue = {
		permissions,
	};

	return (
		<ModulesListContext.Provider value={contextValue}>
			<div className="page-container  list-page-container">
				<ListView {...listProperties} />
			</div>
			;
		</ModulesListContext.Provider>
	);
}
