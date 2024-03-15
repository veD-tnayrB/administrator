import React from 'react';
import { ListView } from '@essential-js/admin/components/list-view';
import { useNotificationsManagmentContext } from '../../context';

export const Profiles = () => {
	const { store } = useNotificationsManagmentContext();

	const listProperties = {
		store: store.profiles,
		searchbar: {
			placeholder: 'Search...',
		},
		header: {
			items: [
				{ label: 'ID', name: 'id' },
				{ label: 'Name', name: 'name' },
				{ label: 'Description', name: 'description' },
			],
			bulkActions: {
				remove: false,
			},
		},
		list: {
			default: true,
			isSelecteable: true,
			itemsConfig: {
				properties: ['id', 'name', 'description'],
			},
		},
	};
	return (
		<div>
			<ListView {...listProperties} />
		</div>
	);
};
