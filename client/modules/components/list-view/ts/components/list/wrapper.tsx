import React from 'react';
import { Spinner } from '@essential-js/admin/components/spinner';
import { useListViewContext } from '../../context';
import { List } from './list';
import { Header } from './header';
import { Loading } from '../../loading';

export const ListContainer = () => {
	const { store, list, header } = useListViewContext();

	let cls = list.default ? `default` : ``;
	cls += !store.ready ? ` loading` : ``;
	cls += store.fetching ? ' fetching' : '';

	if (!store.ready) return <Loading />;

	return (
		<div className={`list-container ${cls}`}>
			{store.fetching && <Spinner />}
			{header && <Header {...header} />}
			<List {...list} />
		</div>
	);
};
