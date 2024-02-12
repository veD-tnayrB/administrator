import React from 'react';
import { ITexts } from './types';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
}
export const NotificationsListContext = React.createContext({} as IContext);
export const useNotificationsListContext = () => React.useContext(NotificationsListContext);
