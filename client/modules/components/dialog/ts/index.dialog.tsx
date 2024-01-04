import React from 'react';
import { Toggler, IToggler } from './toggler';
import { Modal } from './modal';

interface IProps extends HTMLDivElement {
	toggler: IToggler;
	isClose: boolean;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export /*bundle*/ const Dialog = ({ children, isClose, ...props }: IProps) => {
	const [isOpen, setIsOpen] = React.useState(props.isOpen === undefined ? false : null);
	const isModalOpen = isOpen === null ? props.isOpen : isOpen;
	const setIsModalOpen = isOpen === null ? props.setIsOpen : setIsOpen;

	const ref = React.useRef(null);

	React.useEffect((): (() => void) => {
		const handleClick = (event: any): void => {
			const { current } = ref;
			const isSameNode: boolean =
				current === event.target || current === event.currentTarget || event.composedPath()[0] === current;
			const isAChildren: boolean = current?.contains(event.composedPath()[0]);
			if (!isSameNode && !isAChildren) {
				setIsModalOpen(false);
			}
		};
		document.addEventListener('click', handleClick);
		return (): void => document.removeEventListener('click', handleClick);
	}, [isModalOpen]);
	return (
		<div ref={ref} className="essential-dialog">
			<Toggler {...props.toggler} setIsOpen={setIsModalOpen} />
			{isModalOpen && <Modal>{children}</Modal>}
		</div>
	);
};
