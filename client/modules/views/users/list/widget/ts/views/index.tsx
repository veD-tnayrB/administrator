import React from 'react';
import { StoreManager } from '../store';
import { IContext, UsersListContext } from '../context';
import { module } from 'beyond_context';
import { useTexts } from '@essential-js/admin/helpers';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { ListView } from '@essential-js/admin/components/list-view';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts(module.specifier);
	const [update, setUpdate] = React.useState({});

	useBinder([store], () => setUpdate({}));

	if (!ready) return null;

	const contextValue: IContext = {
		store,
		texts,
	};

	const listProperties = {
		store,
		searchbar: {
			filters: {
				title: 'Filter by an specific column',
				items: [
					{ label: 'ID', name: 'id' },
					{ label: 'Names', name: 'names' },
					{ label: 'Last name', name: 'lastNames' },
					{ label: 'GMAIL', name: 'email' },
					{ label: 'timeCreated', name: 'timeCreated', type: 'date' },
				],
				actions: { apply: { label: 'Apply' }, reset: { label: 'Reset' } },
			},
		},
		header: {
			items: ['id', 'First name', 'Last name', 'Email', '', ''],
		},
		list: {
			default: true,
			itemsConfig: {
				properties: ['id', 'names', 'lastNames', 'email'],
			},
		},
		actions: {
			create: {
				to: '/users/managment/create',
			},
			columnsSelector: {
				items: [
					{ label: 'ID', propertyName: 'id' },
					{ label: 'Names', propertyName: 'names' },
					{ label: 'Last name', propertyName: 'lastNames' },
					{ label: 'GMAIL', propertyName: 'email' },
					{ label: 'Updated At', propertyName: 'timeUpdated.date' },
				],
			},
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
