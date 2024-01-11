import React from 'react';
import { IOnSelect, IOption } from './panel/option';

export interface IContext {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	options: IOption[];
	onSelect: (event: IOnSelect) => void;
	value: string | number;
	name: string;
}
export const SelectContext = React.createContext({} as IContext);
export const useSelectContext = () => React.useContext(SelectContext);
