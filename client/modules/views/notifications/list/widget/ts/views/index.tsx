import React from 'react';
import { StoreManager } from '../store';
import { IContext, NotificationsListContext } from '../context';
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
				{ label: texts.list.columns.title, name: 'title' },
				{ label: texts.list.columns.description, name: 'description' },
				{ label: texts.list.columns.timeInterval, name: 'timeInterval' },
				{ label: texts.list.columns.timeCreated, name: 'timeCreated' },
				{ label: texts.list.columns.timeUpdated, name: 'timeUpdated' },
			],
		},
		list: {
			default: true,
			itemsConfig: {
				properties: ['id', 'title', 'description', 'timeInterval', 'timeCreated', 'timeUpdated'],
				actions: [
					{ type: 'edit', to: '/notifications/managment', title: texts.list.actions.item.edit },
					{
						type: 'delete',
						title: texts.list.actions.item.delete.title,
						modal: {
							title: texts.list.actions.item.delete.title,
							description: texts.list.actions.item.delete.description,
							close: {
								label: texts.list.actions.item.delete.close,
							},
							confirm: {
								label: texts.list.actions.item.delete.confirm,
							},
						},
					},
				],
			},
		},
		actions: {
			create: {
				to: '/notifications/managment/create',
				label: texts.actions.create,
			},
			columnsSelector: {
				label: texts.actions.columns,
				min: {
					label: texts.list.actions.columnsSelector.min,
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
