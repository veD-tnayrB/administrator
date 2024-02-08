import React from 'react';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
}
export const UsersListContext = React.createContext({} as IContext);
export const useUsersListContext = () => React.useContext(UsersListContext);
