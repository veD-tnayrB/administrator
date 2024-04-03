import React from 'react';
import { CollapsibleHeader } from './header';
import { CollapsibleContext } from './context';

interface IContainerProps {
	children: React.ReactNode;
	className?: string;
	open?: boolean;
	onToggle?: (open: boolean) => void;
}

export /*bundle */ function CollapsibleContainer({
	children,
	onToggle,
	open = false,
	className,
}: IContainerProps): JSX.Element {
	open;
	const [opened, setOpen] = React.useState(open);
	React.useEffect(() => setOpen(open), [open]);

	const value = { open: opened, setOpen, onToggle };
	const cls = `collapsible__container ${className ? ` ${className}` : ''} `;

	return (
		<CollapsibleContext.Provider value={value}>
			<article className={cls}>{children}</article>
		</CollapsibleContext.Provider>
	);
}
