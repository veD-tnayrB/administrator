import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { IRow, List } from './components/list/list';
import { IContext, ListViewContext } from './context';
import { StoreListView } from './store-prototype';
import { Header, IHeaderItem } from './components/list/header';
import { IPaginatorProps, Paginator } from './components/list/paginator';

interface IProps extends React.HTMLAttributes<HTMLElement> {
	store: StoreListView;
	list: {
		rows?: React.ComponentType<IRow>;
		default?: boolean;
	};
	header?: {
		items?: IHeaderItem;
	};
	paginator?: IPaginatorProps;
}

export /*bundle*/ const ListView = (props: IProps) => {
	const [, setUpdate] = React.useState({});
	useBinder([props.store], () => setUpdate({}));

	const contextValue: IContext = {
		store: props.store,
	};
	const cls = props.list.default ? `default` : ``;
	return (
		<ListViewContext.Provider value={contextValue}>
			<section className={`list-view ${props.className} ${cls}`}>
				{props.header && <Header {...props.header} />}
				<List {...props.list} />
				<Paginator {...props.paginator} />
			</section>
		</ListViewContext.Provider>
	);
};
