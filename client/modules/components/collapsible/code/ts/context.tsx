import React from 'react';

export interface IContext {
	open: boolean;
	setOpen: (open: boolean) => void;
	onChange?: (open: boolean) => void;
}
export const CollapsibleContext = React.createContext({} as IContext);
export const useCollapsibleContext = () => React.useContext(CollapsibleContext);
