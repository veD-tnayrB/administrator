import React from 'react';

export /*bundle*/ function Error({
	show,
	message,
	className,
	children,
}: {
	show: boolean;
	message?: string;
	className?: string;
	children?: React.ReactNode;
}) {

	if (!show) return null;
	const cls = `pui-input-error-label${className ? ` ${className}` : ''}`;
	return (
		<span className={cls}>
			{message} {children}
		</span>
	);
}
