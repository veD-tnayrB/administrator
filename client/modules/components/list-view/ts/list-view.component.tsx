import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { IList } from './components/list/list';
import { IContext, ListViewContext } from './context';
import { StoreListView } from './store-prototype';
import { IHeader } from './components/list/header/header';
import { IPaginator, Paginator } from './components/paginator/paginator';
import { ISearchbar } from './components/utility-bar/searchbar/searchbar';
import { IActions } from './components/utility-bar/actions/actions';
import { ListContainer } from './components/list/wrapper';
import { Utilitybar } from './components/utility-bar/utility-bar';
import { IViewHeader, ViewHeader } from './components/view-header';
import { useInitialize } from './initialize-hook';

export /*bundle*/ interface IListViewProps extends React.HTMLAttributes<HTMLElement> {
	store: StoreListView;
	viewHeader?: IViewHeader;
	searchbar?: ISearchbar;
	list: IList;
	header?: IHeader;
	paginator?: IPaginator;
	actions?: IActions;
	plugins?: string[] | undefined;
}

export /*bundle*/ const ListView = (props: IListViewProps) => {
	const [, setUpdate] = React.useState({});
	useInitialize(props);
	useBinder([props.store], () => setUpdate({}));

	const contextValue: IContext = {
		store: props.store,
		itemsProperties: props.list?.itemsConfig?.properties,
		list: props.list,
		header: props.header,
		searchbar: props.searchbar,
		actions: props.actions,
	};
	let cls = props.list.default ? `default` : ``;
	cls += !props.store.ready ? ` loading` : ``;
	cls += props.store.fetching ? ' fetching' : '';

	return (
		<ListViewContext.Provider value={contextValue}>
			<section className={`list-view ${props.className} ${cls}`}>
				{props.viewHeader && <ViewHeader {...props.viewHeader} />}
				<Utilitybar />
				<ListContainer />
				<Paginator {...props.paginator} />
			</section>
		</ListViewContext.Provider>
	);
};
