import React from 'react';
import { StoreManager } from '../store';
import { IContext, NotificationsListContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { ListView, IListViewProps } from '@essential-js/admin/components/list-view';
import { Row } from './item';
import { usePermissions } from '@essential-js/admin/hooks';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [, setUpdate] = React.useState({});
	const permissions = usePermissions();

	useBinder([store], () => setUpdate({}));

	const listProperties: IListViewProps = {
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
				{ label: 'Created at', name: 'timeCreated' },
				{ label: 'Updated at', name: 'timeUpdated' },
				{ label: '', name: '' },
			],
		},
		list: {
			default: true,
			itemsConfig: {
				properties: ['id', 'title', 'description', 'timeCreated', 'timeUpdated'],
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
	const contextValue: IContext = {
		store,
		permissions,
	};

	if (!permissions.has('notifications.create')) listProperties.actions!.create = undefined;

	return (
		<NotificationsListContext.Provider value={contextValue}>
			<div className="page-container list-page-container">
				<ListView {...listProperties} />
			</div>
		</NotificationsListContext.Provider>
	);
}
