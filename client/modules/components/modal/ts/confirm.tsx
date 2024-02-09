import React from 'react';
import { Button } from 'pragmate-ui/components';
import { BaseModal } from './base';

export /*bundle*/ interface IAction extends React.HTMLAttributes<HTMLButtonElement> {
	label: string;
}

interface IProps {
	title: string;
	description: string;
	close: IAction;
	confirm: IAction;
}

export /*bundle*/
const ConfirmModal = ({ title, description, close, confirm }: IProps) => {
	return (
		<BaseModal onClose={close.onClick}>
			<header>
				<h1>{title}</h1>
			</header>
			<p>{description}</p>

			<footer>
				<div className="actions">
					<Button variant="primary" {...confirm}>
						{confirm.label}
					</Button>
					<Button variant="secondary" {...close}>
						{close.label}
					</Button>
				</div>
			</footer>
		</BaseModal>
	);
};
