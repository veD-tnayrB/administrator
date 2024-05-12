import * as React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { StoreManager } from '../store';
import { ListView } from '@essential-js/admin/components/list-view';
import { usePermissions } from '@essential-js/admin/helpers';
import { ProfilesListContext } from '../context';
import { Row } from './item';

export /*bundle*/
	function View({ store }: { store: StoreManager }) {
	const [update, setUpdate] = React.useState({});
	const permissions = usePermissions();
	useBinder([store], () => {
		setUpdate({});
	});

	const listProperties = {
		store,
		plugins: ['reports'],
		viewHeader: {
			title: 'Profiles',
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
				{ label: 'Name', name: 'name' },
				{ label: 'Description', name: 'description' },
				{ label: 'Created at', name: 'timeCreated' },
				{ label: 'Updated at', name: 'timeUpdated' },
			],
			actions: [
				{ type: 'edit' },
			]
		},
		list: {
			row: Row,
			default: true,
			itemsConfig: {
				properties: ['', 'id', 'name', 'description', 'timeCreated', 'timeUpdated'],
				actions: [{ type: 'edit' }]
			},

		},
		actions: {
			create: {
				to: '/profiles/managment/create',
				label: 'Create',
			},
			columnsSelector: {
				title: 'Select the columns you want to appear',
				min: {
					label: "You can't select less than {{number}} columns",
					number: 2,
				},
			},
			reports: {
				generateReport: {
					excel: true,
					csv: true,
				},
				downloadTemplate: {
					excel: true,
					csv: true,
				},
				import: true,
			},
		},
	};

	if (!permissions.has('profiles.create')) listProperties.actions.create = null;
	if (!permissions.has('profiles.get-template')) listProperties.actions.reports.downloadTemplate = null;
	if (!permissions.has('profiles.generate-report')) listProperties.actions.reports.generateReport = null;
	if (!permissions.has('profiles.import')) listProperties.actions.reports.import = null;

	const contextValue = {
		permissions
	}

	return (
		<ProfilesListContext.Provider value={contextValue}>
			<div className="page-container  list-page-container">
				<ListView {...listProperties} />
			</div>
		</ProfilesListContext.Provider>
	);
}
