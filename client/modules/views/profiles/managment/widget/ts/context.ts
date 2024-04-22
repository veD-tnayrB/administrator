import React from 'react';
import { StoreManager } from './store';

export interface IContext {
	store: StoreManager;
}

export const ProfilesManagmentContext = React.createContext<IContext>({} as IContext);
export const useProfilesManagmentContext = () => React.useContext(ProfilesManagmentContext);
