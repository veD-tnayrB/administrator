import React from 'react';

export interface ICollapsibleContext {
	open: boolean;
	setOpen: (open: boolean) => void;
	onChange: (open: boolean) => void;
}
export const CollapsibleContext = React.createContext(null);
export const useCollapsibleContext = () => React.useContext(CollapsibleContext);
