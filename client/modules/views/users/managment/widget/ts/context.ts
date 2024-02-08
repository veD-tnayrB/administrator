import React from 'react';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
}

export const UsersManagementContext = React.createContext<IContext>({} as IContext);
export const useUsersManagmentContext = () => React.useContext(UsersManagementContext);
