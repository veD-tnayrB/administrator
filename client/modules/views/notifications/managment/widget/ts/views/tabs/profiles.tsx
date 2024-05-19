import React from 'react';
import { ListView, IListViewProps } from '@essential-js/admin/components/list-view';
import { useNotificationsManagmentContext } from '../../context';

export const Profiles = () => {
	const { store } = useNotificationsManagmentContext();

	const listProperties: IListViewProps = {
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
