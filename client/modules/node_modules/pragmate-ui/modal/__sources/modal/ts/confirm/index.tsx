import * as React from 'react';
import { Button } from 'pragmate-ui/components';
import { Modal } from '../modal';
import { useActionProperties } from './use-action-properties';
import { IConfirmModalProps } from './interfaces';

export /*bundle*/ const ConfirmModal = (properties: IConfirmModalProps): JSX.Element => {
	type state = {
		fetching?: boolean;
	};
	const [state, setState] = React.useState<state>({ fetching: false });

	const { text, title, onCancel, centered, onClose } = properties;

	let cls: string = `pui-confirm-dialog${centered ? ' pui-confirm-dialog-centered' : ''}`;
	if (properties.className) cls += ` ${properties.className}`;

	const props = Object.assign({}, properties);

	['text', 'title', 'className', 'centering', 'btnCancel', 'btnConfirm', 'onCancel'].forEach(
		prop => delete props[prop]
	);

	const [confirmProps, cancelProps] = useActionProperties(properties, setState);

	const disabled: { disabled?: boolean } = {};
	if (state.fetching) disabled.disabled = true;

	const handleClose = onClose ?? onCancel;

	return (
		<Modal show className={cls} onClose={handleClose}>
			<div className='pui-confirm-dialog-content'>
				{title && <h3>{title}</h3>}
				{text && <div className='pui-confirm-dialog-content__text'>{text}</div>}
				{properties.children}
			</div>

			<div className='actions'>
				<Button {...cancelProps} {...disabled} />
				<Button {...disabled} {...confirmProps} />
			</div>
		</Modal>
	);
};
