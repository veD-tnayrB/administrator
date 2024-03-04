import React from 'react';
interface IContextMenu {
	opened?: boolean;
	position?: {
		x: number;
		y: number;
	};
	closeContextMenu: () => void;
}
export const ContextMenuContext = React.createContext({} as IContextMenu);
export const useContextMenuContext = () => React.useContext(ContextMenuContext);
