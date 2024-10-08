import React from 'react';
import Select from 'react-select';
import { StyleObserver } from './observer';

export /*bundle*/
function ReactSelect(props) {
	const properties = { ...props };
	const ref = React.useRef(null);

	React.useEffect(() => {
		const host = ref.current.getRootNode()?.host;
		if (!host) {
			console.warn('is not inside a web component');
		}
		const headStyles = document.head.querySelectorAll('style[data-emotion]');

		const insert = (nodes: HTMLElement[] | NodeList) => {
			nodes.forEach(node => {
				if (node instanceof HTMLStyleElement) {
					// Handle the new style element
					const clonedStyle = node.cloneNode(true) as HTMLElement;
					host.shadowRoot.appendChild(clonedStyle);
				}
			});
		};

		const styleObserver: StyleObserver = new StyleObserver({
			callback: insert,
		});
		const targetNode: HTMLHeadElement = document.head;
		styleObserver.startObserving(targetNode);
		insert(headStyles);

		return () => styleObserver.stopObserving();
	}, []);

	return (
		<div className='pui-select' ref={ref}>
			<Select classNamePrefix='pui-react-select' {...properties} />
		</div>
	);
}
