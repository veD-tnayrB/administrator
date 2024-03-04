import * as React from 'react';
import { IInputContextValue } from './interfaces';

export const InputContext: React.Context<IInputContextValue> = React.createContext({});
export const useInputContext = (): IInputContextValue => React.useContext(InputContext);
