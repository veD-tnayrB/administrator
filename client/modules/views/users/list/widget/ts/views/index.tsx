import React from 'react';
import { StoreManager } from '../store';
import { IContext, UsersListContext } from '../context';
import { module } from 'beyond_context';
import { useTexts } from '@essential-js/admin/helpers';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { ListView } from '@essential-js/admin/components/list-view';
import { ITexts } from '../types';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts<ITexts>(module.specifier);
	const [update, setUpdate] = React.useState({});

	useBinder([store], () => setUpdate({}));

	if (!ready) return null;

	const contextValue: IContext = {
		store,
		texts,
	};

	const listProperties = {
		store,
		viewHeader: {
			title: texts.title,
		},
		searchbar: {
			placeholder: texts.searchbar.placeholder,
			filters: {
				title: texts.searchbar.filtersDialog.title,
				label: texts.searchbar.filtersDialog.label,
				actions: {
					apply: { label: texts.searchbar.filtersDialog.apply },
					reset: { label: texts.searchbar.filtersDialog.reset },
				},
			},
		},
		header: {
			items: [
				{ label: texts.list.columns.id, name: 'id' },
				{ label: texts.list.columns.names, name: 'names' },
				{ label: texts.list.columns.lastNames, name: 'lastNames' },
				{ label: texts.list.columns.email, name: 'email' },
				{ label: texts.list.columns.timeCreated, name: 'timeCreated' },
				{ label: texts.list.columns.timeUpdated, name: 'timeUpdated' },
			],
		},
		list: {
			default: true,
			itemsConfig: {
				properties: ['id', 'names', 'lastNames', 'email', 'timeCreated', 'timeUpdated'],
			},
		},
		actions: {
			create: {
				to: '/users/managment/create',
				label: texts.actions.create,
			},
			columnsSelector: {
				label: texts.actions.columns,
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
