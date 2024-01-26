import React from 'react';
import { Spinner } from '@essential-js/admin/components/spinner';
import { useListViewContext } from '../../context';
import { List } from './list';
import { Header } from './header';
import { Loading } from '../../loading';
import { Empty } from '../empty';

export const ListContainer = () => {
	const { store, list, header } = useListViewContext();

	const isEmpty = store.collection.items.length === 0;
	let cls = list.default ? `default` : ``;
	cls += !store.ready ? ` loading` : ``;
	cls += isEmpty ? ' empty' : '';
	cls += store.fetching ? ' fetching' : '';

	if (!store.ready) return <Loading />;

	return (
		<div className={`list-container ${cls}`}>
			{isEmpty && <Empty />}
			{store.fetching && <Spinner />}
			{header && <Header {...header} />}
			<List {...list} />
		</div>
	);
};
