import React from 'react';
import { StoreManager } from './store';
import { IModule } from '@essential-js/admin/models';

export interface IContext {
	store: StoreManager;
	item: IModule
	setItem: React.Dispatch<React.SetStateAction<IModule>>
}

export const ModulesManagmentContext = React.createContext({} as IContext);
export const useModulesManagmentContext = () => React.useContext(ModulesManagmentContext);
