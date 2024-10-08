import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useContextMenuContext } from './context';

interface ContextMenuProps {
	className?: string;
	unmount: (value: boolean) => void;
	children: React.ReactNode;
}

export /*bundle*/ function ContextMenu({ className, unmount, children }: ContextMenuProps) {
	const container = document.createElement('span');
	const ref = useRef<HTMLDivElement>(null);

	const { opened, position } = useContextMenuContext();

	const close = () => {
		document.removeEventListener('click', close);
		unmount(false);
	};

	useEffect(() => {
		const body = document.querySelector('body');
		if (!body) return;

		document.addEventListener('click', close);
		body.appendChild(container);

		const refCurrent = ref.current;
		if (!refCurrent) return;

		const { offsetWidth, offsetHeight } = refCurrent;
		const tWidth = offsetWidth + position.x;
		const tHeight = offsetHeight + position.y;

		if (tWidth > globalThis.innerWidth) {
			refCurrent.style.left = `${position.x - offsetWidth}px`;
		}
		if (tHeight > globalThis.innerHeight) {
			refCurrent.style.top = `${position.y - offsetHeight}px`;
		}

		return () => {
			document.removeEventListener('click', close);
			container.remove();
		};
	}, [position?.x, position?.y]);

	if (!opened) {
		return null;
	}

	const styles: React.CSSProperties = {
		position: 'absolute', // Explicitly typed as a valid CSS position value
		top: `${position.y}px`,
		left: `${position.x}px`,
	};

	const cls = `pui-context-menu ${className || ''}`;
	return (
		<div style={styles} ref={ref} className={cls}>
			{children}
		</div>
	);
}
