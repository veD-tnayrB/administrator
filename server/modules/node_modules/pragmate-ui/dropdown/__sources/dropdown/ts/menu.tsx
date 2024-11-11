import React from 'react';
import { useDropdownContext } from './context';

type props = {
	className: string;
};

export /*bundle*/ function DropDownMenu({ children, className }: React.PropsWithChildren<props>): JSX.Element {
	const { showMenu, setShowMenu, isToggle, onToggle, isClose } = useDropdownContext();
	const ref = React.useRef(null);

	React.useEffect((): (() => void) => {
		const handleClick = (event: any): void => {
			const { current } = ref;
			const isSameNode: boolean =
				current === event.target || current === event.currentTarget || event.composedPath()[0] === current;
			const isAChildren: boolean = current?.contains(event.composedPath()[0]);
			if (!isSameNode && !isAChildren) {
				setShowMenu(false);
				if (!!onToggle && isToggle && typeof onToggle === 'function' && isClose) {
					onToggle();
				}
			}
		};

		document.addEventListener('click', handleClick);
		return (): void => document.removeEventListener('click', handleClick);
	}, [isClose]);
	if (!showMenu && !isToggle) return null;

	const cls: string = `${className ?? ''} dropdown-menu-container`;
	return (
		<div ref={ref} className={cls}>
			{children}
		</div>
	);
}
