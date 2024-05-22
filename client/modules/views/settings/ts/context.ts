import React from 'react';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
}

export const SettingsContext = React.createContext({} as IContext);
export const useSettingsContext = () => React.useContext(SettingsContext);
