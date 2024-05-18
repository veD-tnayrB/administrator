import React from 'react';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
}

export const LayoutContext = React.createContext({} as IContext);
export /*bundle*/ const useLayoutContext = () => React.useContext(LayoutContext);
