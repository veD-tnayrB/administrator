import React from 'react';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
}

export const NotificationsManagmentContext = React.createContext<IContext>({} as IContext);
export const useNotificationsManagmentContext = () => React.useContext(NotificationsManagmentContext);
