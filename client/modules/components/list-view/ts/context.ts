import React from 'react';
import { StoreListView } from './store-prototype';

export interface IContext {
	store: StoreListView;
}

export const ListViewContext = React.createContext<IContext>({} as IContext);
export const useListViewContext = () => React.useContext(ListViewContext);
