import * as React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { useTexts } from '@essential-js/admin/helpers';
import { module } from 'beyond_context';
import { StoreManager } from '../store';
import { ITexts } from '../types';
import { ListView } from '@essential-js/admin/components/list-view';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts<ITexts>(module.specifier);
	const [update, setUpdate] = React.useState({});
	useBinder([store], () => {
		setUpdate({});
	});

	if (!ready) return null;
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
				{ label: texts.list.columns.name, name: 'name' },
				{ label: texts.list.columns.description, name: 'description' },
				{ label: texts.list.columns.timeCreated, name: 'timeCreated' },
				{ label: texts.list.columns.timeUpdated, name: 'timeUpdated' },
			],
		},
		list: {
			default: true,
			itemsConfig: {
				properties: ['id', 'name', 'description', 'timeCreated', 'timeUpdated'],
				actions: [{ type: 'edit', to: '/profiles/managment', title: texts.list.actions.item.edit }],
			},
		},
		actions: {
			create: {
				to: '/profiles/managment/create',
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
		<div className="page-container">
			<ListView {...listProperties} />
		</div>
	);
}
