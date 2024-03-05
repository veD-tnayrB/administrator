import React from 'react';
import { StoreManager } from './store';
import { ITexts } from './types';

export interface IContext {
	store: StoreManager;
}

export const NotificationsManagmentContext = React.createContext<IContext>({} as IContext);
export const useNotificationsManagmentContext = () => React.useContext(NotificationsManagmentContext);
