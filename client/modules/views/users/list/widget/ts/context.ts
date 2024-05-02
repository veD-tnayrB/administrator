import React from 'react';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
	permissions: Map<string, Record<string, string>>;
}
export const UsersListContext = React.createContext({} as IContext);
export const useUsersListContext = () => React.useContext(UsersListContext);
