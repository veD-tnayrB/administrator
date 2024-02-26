import React from 'react';
import { StoreManager } from '../store';
import { IContext, NotificationsListContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { ListView } from '@essential-js/admin/components/list-view';
import { Row } from './row';

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
			title: 'Notifications',
		},
		searchbar: {
			placeholder: 'Search...',
			filters: {
				title: 'Filter',
				actions: {
					apply: { label: 'Search' },
					reset: { label: 'Reset' },
				},
			},
		},
		header: {
			items: [
				{ label: 'ID', name: 'id' },
				{ label: 'Titulo', name: 'title' },
				{ label: 'Description', name: 'description' },
				{ label: 'Time interval', name: 'timeInterval' },
				{ label: 'Created at', name: 'timeCreated' },
				{ label: 'Updated at', name: 'timeUpdated' },
			],
		},
		list: {
			default: true,
			itemsConfig: {
				properties: ['id', 'title', 'description', 'timeInterval', 'timeCreated', 'timeUpdated'],
				actions: [{ type: 'edit', to: '/notifications/managment', title: 'Edit' }],
			},
			row: Row,
		},
		actions: {
			create: {
				to: '/notifications/managment/create',
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
	return (
		<NotificationsListContext.Provider value={contextValue}>
			<div className="page-container">
				<ListView {...listProperties} />
			</div>
		</NotificationsListContext.Provider>
	);
}
