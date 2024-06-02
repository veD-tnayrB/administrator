import React from 'react';
import { BaseModal } from './base';

interface IProps extends React.HTMLProps<HTMLDivElement> {
	title: string;
	onClose: () => void;
	children: React.ReactNode;
}

export /*bundle*/
const Modal = ({ title, onClose, children, ...props }: IProps) => {
	return (
		<BaseModal onClose={onClose} {...props}>
			<header>
				<h1>{title}</h1>
			</header>
			<>{children}</>
		</BaseModal>
	);
};
