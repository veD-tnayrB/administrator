import React from 'react';
import { ITexts } from './types';
import { StoreManager } from '../store';

export interface IContext {
	texts: ITexts;
	store: StoreManager;
}
export const LoginContext = React.createContext({} as IContext);
export const useLoginContext = () => React.useContext(LoginContext);
