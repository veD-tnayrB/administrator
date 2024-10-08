import React from 'react';
import { IconButton } from 'pragmate-ui/icons';
import { Toasts, toast } from 'pragmate-ui/toast';
import { useClick } from './use-click';

export function Clipboard({ text }) {
	const [ref, onClick] = useClick();
	return (
		<div className='clipboard__container' data-text={text} ref={ref} onClick={onClick}>
			<IconButton title='copy' icon='copy' />
			<span className='action-copied'>Copied</span>
		</div>
	);
}
