import React from 'react';
import { Spinner } from '@essential-js/admin/components/spinner';
import { useListViewContext } from '../../context';
import { List } from './list';
import { Header } from './header';
import { Loading } from '../../loading';
import { Empty } from '../empty';

export const ListContainer = () => {
	const { store, list, header } = useListViewContext();

	let cls = list.default ? `default` : ``;
	cls += !store.ready ? ` loading` : ``;
	cls += store.fetching ? ' fetching' : '';

	if (!store.ready) return <Loading />;

	const content = store.collection.items.length > 0 ? <List {...list} /> : <Empty />;

	return (
		<div className={`list-container ${cls}`}>
			{store.fetching && <Spinner />}
			{header && <Header {...header} />}
			{content}
		</div>
	);
};
