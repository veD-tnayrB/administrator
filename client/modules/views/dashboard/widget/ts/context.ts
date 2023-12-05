import React from 'react';
import { ITexts } from './types';
import { StoreManager } from './store';

export interface IContext {
	texts: ITexts;
	store: StoreManager;
}
export const DashboardContext = React.createContext({} as IContext);
export const useDashboardContext = () => React.useContext(DashboardContext);
