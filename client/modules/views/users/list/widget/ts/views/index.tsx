import React from 'react';
import { StoreManager } from '../store';
import { IContext, UsersListContext } from '../context';
import { module } from 'beyond_context';
import { useTexts } from '@essential-js/admin/helpers';
import { Button } from 'pragmate-ui/components';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { routing } from '@beyond-js/kernel/routing';
import { ListView } from '@essential-js/admin/components/list-view';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts(module.specifier);
	const [update, setUpdate] = React.useState({});

	useBinder([store], () => setUpdate({}));

	if (!ready) return null;

	const onClick = () => {
		routing.pushState('/users/managment/create');
	};

	const contextValue: IContext = {
		store,
		texts,
	};

	const output = store.collection.items.map(item => <li key={item.id}>{item.fullName}</li>);

	const listProperties = {
		store,
		list: {
			default: true,
		},
		header: {
			items: ['Active', 'Email', 'Last name', 'First name', 'id'],
		},
		paginator: {
			onNext: store.onNext,
			onPrev: store.onPrev,
		},
	};
	return (
		<UsersListContext.Provider value={contextValue}>
			<div className="page-container">
				<Button onClick={onClick}>{texts.create}</Button>
				<ListView {...listProperties} />
			</div>
		</UsersListContext.Provider>
	);
}
