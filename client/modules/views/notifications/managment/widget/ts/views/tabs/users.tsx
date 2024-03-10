import React from 'react';
import { useNotificationsManagmentContext } from '../../context';
import { ListView } from '@essential-js/admin/components/list-view';

export const Users = () => {
	const { store } = useNotificationsManagmentContext();

	const listProperties = {
		store: store.users,

		searchbar: {
			placeholder: 'Search...',
		},
		header: {
			items: [
				{ label: 'ID', name: 'id' },
				{ label: 'Names', name: 'names' },
				{ label: 'Last names', name: 'lastNames' },
				{ label: 'Email', name: 'email' },
			],
			bulkActions: {
				remove: false,
			},
		},
		list: {
			default: true,
			isSelecteable: true,
			itemsConfig: {
				properties: ['id', 'names', 'lastNames', 'email'],
			},
		},
	};
	return (
		<div>
			<ListView {...listProperties} />
		</div>
	);
};
