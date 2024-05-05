import React from 'react';
import { ITexts } from './types';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
	permissions: Map<string, Record<string, string>>
}

export const NotificationsListContext = React.createContext({} as IContext);
export const useNotificationsListContext = () => React.useContext(NotificationsListContext);
