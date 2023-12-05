import React from 'react';
import { ITexts } from './types';
import { StoreManager } from './store';

export interface IContext {
	texts: ITexts;
	store: StoreManager;
}
export const UsersListContext = React.createContext({} as IContext);
export const useUsersListContext = () => React.useContext(UsersListContext);
