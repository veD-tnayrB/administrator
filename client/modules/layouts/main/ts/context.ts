import React from 'react';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
}

export const LayoutContext = React.createContext({} as IContext);
export const useLayoutContext = () => React.useContext(LayoutContext);
