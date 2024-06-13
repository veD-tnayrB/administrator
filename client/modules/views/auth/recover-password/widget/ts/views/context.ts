import React from 'react';
import { StoreManager } from '../store';

export interface IContext {
	store: StoreManager;
}
export const LoginContext = React.createContext({} as IContext);
export const useLoginContext = () => React.useContext(LoginContext);
