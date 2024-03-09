import React from 'react';
import { ListView } from '@essential-js/admin/components/list-view';
import { useNotificationsManagmentContext } from '../../context';

export const Profiles = () => {
	const { store } = useNotificationsManagmentContext();
	const listProperties = {
		store: store.profiles,

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
			bulkActions: {
				remove: false,
			},
		},
		list: {
			default: true,
			isSelecteable: true,

			itemsConfig: {
				properties: ['id', 'name', 'description', 'timeCreated', 'timeUpdated'],
			},
		},
		actions: {
			columnsSelector: {
				title: 'Select the columns you want to appear',
				min: {
					label: "You can't select less than {{number}} columns",
					number: 2,
				},
			},
		},
	};
	return (
		<div>
			<ListView {...listProperties} />
		</div>
	);
};
