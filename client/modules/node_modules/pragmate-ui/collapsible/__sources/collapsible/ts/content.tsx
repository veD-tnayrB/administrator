import React from 'react';
import {useCollapsibleContext} from './context';

interface ICollapsibleProps {
	children: React.ReactNode;
	className?: string;
}
export /*bundle */ function CollapsibleContent({className, children}: ICollapsibleProps) {
	const {open} = useCollapsibleContext();
	const cls = `collapsible__content${className ? ` ${className}` : ''} ${
		open ? ' collapsible__content--opened' : ''
	}`;
	return <section className={cls}>{children}</section>;
}
