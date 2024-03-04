import React from 'react';
import { ContextMenuContext } from './context';
export /*bundle*/
function ContextMenuContainer({ children }) {
	const [showContextMenu, toggleContextMenu] = React.useState<null | { x: number; y: number }>();

	const onClick = event => {
		event.stopPropagation();
		event.preventDefault();
		toggleContextMenu({ x: event.clientX, y: event.clientY });
	};

	const closeContextMenu = () => toggleContextMenu(null);
	return (
		<ContextMenuContext.Provider
			value={{
				closeContextMenu,
				opened: !!showContextMenu,
				position: showContextMenu,
			}}
		>
			<span className='context-menu__container' onClick={onClick}>
				{children}
			</span>
		</ContextMenuContext.Provider>
	);
}
