import * as React from 'react';
import { useDropdownContext } from './context';
type props = {
	className?: string;
};

export /*bundle*/ function DropdownToggle({ children, className }: React.PropsWithChildren<props>): JSX.Element {
	const cls: string = `${className ?? ''} dropdown-toggle`;
	const { showMenu, setShowMenu, isToggle, onToggle } = useDropdownContext();
	const handleClick = (event: React.SyntheticEvent): void => {
		event.stopPropagation();
		if (!isToggle) setShowMenu(!showMenu);
		if (!!onToggle && isToggle && typeof onToggle === 'function') onToggle();
	};
	return (
		<div onClick={handleClick} className={cls}>
			{children}
		</div>
	);
}
