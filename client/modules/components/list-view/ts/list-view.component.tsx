import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { IList, List } from './components/list/list';
import { IContext, ListViewContext } from './context';
import { StoreListView } from './store-prototype';
import { Header, IHeader } from './components/list/header';
import { IPaginatorProps, Paginator } from './components/list/paginator';
import { Loading } from './loading';
import { Spinner } from '@essential-js/admin/components/spinner';

interface IProps extends React.HTMLAttributes<HTMLElement> {
	store: StoreListView;
	list: IList;
	header?: IHeader;
	paginator?: IPaginatorProps;
}

export /*bundle*/ const ListView = (props: IProps) => {
	const [, setUpdate] = React.useState({});
	useBinder([props.store], () => setUpdate({}));

	const contextValue: IContext = {
		store: props.store,
	};
	let cls = props.list.default ? `default` : ``;
	cls += !props.store.ready ? ` loading` : ``;
	cls += props.store.fetching ? ' fetching' : '';

	if (!props.store.ready) return <Loading />;

	return (
		<ListViewContext.Provider value={contextValue}>
			<section className={`list-view ${props.className} ${cls}`}>
				{props.store.fetching && <Spinner />}
				{props.header && <Header {...props.header} />}
				<List {...props.list} />
				<Paginator {...props.paginator} />
			</section>
		</ListViewContext.Provider>
	);
};
