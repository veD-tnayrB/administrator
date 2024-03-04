import React from 'react';
import { Icon } from 'pragmate-ui/icons';
import { useContextMenuContext } from './context';
interface ContextItemProps {
	onClick: (event) => void;
	icon?: string;
	label: string;
}

export /*bundle */ function ContextItem({ onClick, icon, label }: ContextItemProps) {
	const { closeContextMenu } = useContextMenuContext();
	const onClickEvent = async event => {
		event.stopPropagation();
		await onClick(event);
		closeContextMenu();
	};
	return (
		<li onClick={onClickEvent}>
			{icon ? <Icon icon={icon} /> : <span />}
			{label}
		</li>
	);
}
