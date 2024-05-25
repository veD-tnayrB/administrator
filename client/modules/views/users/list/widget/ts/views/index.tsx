import React from 'react';
import { StoreManager } from '../store';
import { IContext, UsersListContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { ListView, IListViewProps } from '@essential-js/admin/components/list-view';
import { usePermissions } from '@essential-js/admin/hooks';
import { Row } from './item';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const permissions = usePermissions();
	const [, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}));
	const contextValue: IContext = {
		store,
		permissions,
	};

	const listProperties: IListViewProps = {
		store,
		plugins: ['reports'],
		viewHeader: {
			title: 'Users',
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
				{ label: 'Names', name: 'names' },
				{ label: 'Last names', name: 'lastNames' },
				{ label: 'Email', name: 'email' },
				{ label: 'Created at', name: 'timeCreated' },
				{ label: 'Updated at', name: 'timeUpdated' },
				{ label: '', name: '' },
			],
			actions: {
				edit: { to: '/users/managment' },
			},
		},
		list: {
			row: Row,
			default: true,
			isSelecteable: true,
			itemsConfig: {
				properties: ['id', 'names', 'lastNames', 'email', 'timeCreated', 'timeUpdated'],
			},
		},
		actions: {
			create: {
				to: '/users/managment/create',
				label: 'Create',
			},
			columnsSelector: {
				title: 'Select the columns you want to appear',
				label: '',
				min: {
					label: `You can't select less than {{number}} columns`,
					number: 2,
				},
			},
			reports: {
				generateReport: {
					excel: {},
					csv: {},
				},
				downloadTemplate: {
					excel: {},
					csv: {},
				},
				import: {},
			},
		},
	};

	if (!permissions.has('users.create')) listProperties.actions!.create = undefined;
	if (!permissions.has('users.get-template')) listProperties.actions!.reports!.downloadTemplate = undefined;
	if (!permissions.has('users.generate-report')) listProperties.actions!.reports!.generateReport = undefined;
	if (!permissions.has('users.import')) listProperties.actions!.reports!.import = undefined;

	return (
		<UsersListContext.Provider value={contextValue}>
			<div className="page-container  list-page-container">
				<ListView {...listProperties} />
			</div>
		</UsersListContext.Provider>
	);
}
