import React from 'react';
import { Icon } from 'pragmate-ui/icons';
interface IProps {
	text?: string;
	icon?: string;
	additionalElement?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
}
export /*bundle*/
function Empty(props: IProps): JSX.Element {
	const cls = `${props.className ?? ''} pui-empty-section`;

	return (
		<div className={cls}>
			<div className="content">
				{props.icon && <Icon icon={props.icon} />}
				{props.text && <h3>{props.text}</h3>}
				{props.children && props.children}
			</div>
		</div>
	);
}
