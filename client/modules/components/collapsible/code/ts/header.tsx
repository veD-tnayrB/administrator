import React from 'react';
import { useCollapsibleContext } from './context';
import { IconButton } from 'pragmate-ui/icons';

interface ICollapsibleProps {
	children: React.ReactNode;
	className?: string;
	toggleTitle?: boolean;
}
export /*bundle */ function CollapsibleHeader({
	children,
	className,
	toggleTitle = true,
}: ICollapsibleProps): JSX.Element {
	const { setOpen, onChange, open } = useCollapsibleContext();

	const onClick = async () => {
		if (onChange) onChange(!open);
		setOpen(!open);
	};
	const cls = `collapsible__header ${className ? ` ${className}` : ''} ${open ? 'open' : ''}`;
	const clsButton = `collapsible__button ${open ? ' collapsible__button--opened' : ''}`;
	const attrs: { className: string; onClick?: () => void } = { className: cls };
	if (toggleTitle) {
		attrs.onClick = onClick;
	}

	const title = open ? 'Close' : 'Open';

	return (
		<header {...attrs}>
			<div className="collapsible__header-content">{children}</div>
			<IconButton aria-label={title} onClick={onClick} className={clsButton} icon={'left'} />
		</header>
	);
}
