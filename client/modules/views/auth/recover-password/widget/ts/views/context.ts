import React from 'react';
import { StoreManager } from '../store';

export interface IContext {
	store: StoreManager;
}
export const RecoverPasswordContext = React.createContext({} as IContext);
export const useRecoverPasswordContext = () => React.useContext(RecoverPasswordContext);
