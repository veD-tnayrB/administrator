import React from 'react';
import {Icon} from 'pragmate-ui/icons';
export function Content({message, children, title, icon}) {
	let output = [];

	if (title) {
		output.push(
			<header key="title" className="alert__title">
				<h3 className="alert__title-span" dangerouslySetInnerHTML={{__html: title}} />
			</header>
		);
	}

	if (message) {
		output.push(<span key="message" dangerouslySetInnerHTML={{__html: message}}></span>);
	}
	const Control = icon ? 'section' : React.Fragment;
	return (
		<Control>
			{output}
			{children}
		</Control>
	);
}
