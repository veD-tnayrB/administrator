import React from 'react';

interface IButtonGroupContext {
	active?: any;
	selected: number;
	setSelected: any;
}
export const ButtonGroupContext = React.createContext({} as IButtonGroupContext);
export const useButtonGroupContext = () => React.useContext(ButtonGroupContext);
