import React from 'react';
import { StoreManager } from '../store';
import { IContext, UsersListContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { ListView } from '@essential-js/admin/components/list-view';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [update, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}));

	const contextValue: IContext = {
		store,
	};

	const listProperties = {
		store,
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
			],
			actions: {
				edit: { to: '/users/managment' },
			},
		},
		list: {
			default: true,
			isSelecteable: true,
			itemsConfig: {
				properties: ['id', 'names', 'lastNames', 'email', 'timeCreated', 'timeUpdated'],
				actions: [
					{ type: 'edit', to: '/users/managment', title: 'Edit' },
					{
						type: 'delete',
						title: 'Remove',
						modal: {
							title: 'Remove',
							description: 'Are you sure you want to remove this user?',
							close: {
								label: 'Cancel',
							},
							confirm: {
								label: 'Remove',
							},
						},
					},
				],
			},
		},
		actions: {
			create: {
				to: '/users/managment/create',
				label: 'Create',
			},
			editAll: true,
			removeAll: true,
			columnsSelector: {
				title: 'Select the columns you want to appear',
				label: '',
				min: {
					label: `You can't select less than {{number}} columns`,
					number: 2,
				},
			},
			generateReport: {
				excel: true,
				csv: true,
			},
			import: true,
		},
	};
	return (
		<UsersListContext.Provider value={contextValue}>
			<div className="page-container">
				<ListView {...listProperties} />
			</div>
		</UsersListContext.Provider>
	);
}
