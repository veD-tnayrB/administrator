import React from 'react';
import { StoreManager } from './store';
import { ITexts } from './types';

export interface IContext {
	store: StoreManager;
	texts: ITexts;
}

export const LayoutContext = React.createContext({} as IContext);
export const useLayoutContext = () => React.useContext(LayoutContext);
