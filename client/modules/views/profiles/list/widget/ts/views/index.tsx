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
			title: 'Profiles',
		},
		searchbar: {
			placeholder: 'Search...',
			filters: {
				label: 'Filter',
				actions: {
					apply: { label: 'Search' },
					reset: { label: 'Reset' },
				},
			},
		},
		header: {
			items: [
				{ label: 'ID', name: 'id' },
				{ label: 'Name', name: 'name' },
				{ label: 'Description', name: 'description' },
				{ label: 'Created at', name: 'timeCreated' },
				{ label: 'Updated at', name: 'timeUpdated' },
			],
		},
		list: {
			default: true,
			itemsConfig: {
				properties: ['id', 'name', 'description', 'timeCreated', 'timeUpdated'],
				actions: [{ type: 'edit', to: '/profiles/managment', title: 'Edit' }],
			},
		},
		actions: {
			create: {
				to: '/profiles/managment/create',
				label: 'Create',
			},
			columnsSelector: {
				label: 'Columns',
				min: {
					label: "You can't select less than {{number}} columns",
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
