import React from 'react';
import { StoreManager } from '../store';

export interface IContext {
	store: StoreManager;
}
export const ForgetPasswordContext = React.createContext({} as IContext);
export const useForgetPasswordContext = () => React.useContext(ForgetPasswordContext);
