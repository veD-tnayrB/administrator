import React from 'react';
import { CollapsibleContainer } from './';
import { CollapsibleHeader } from './header';
import { CollapsibleContent } from './content';
import { IconButton } from 'pragmate-ui/icons';
interface IAccordionContext {
	onChange?: (event: any) => void;
	opened?: number;
	setOpened?: (opened: number) => void;
}
export const AccordionContext = React.createContext({} as IAccordionContext);
export const useAccordionContext = () => React.useContext(AccordionContext);

export /*bundle */ function Header({ disabled, children, index }) {
	const { setOpened, opened } = useAccordionContext();
	const onClick = event => {
		event.stopPropagation();
		event.currentTarget.classList.toggle('accordion-item__header-icon--opened');
		setOpened(index === opened ? false : index);
	};
	const attrs: { onClick?: (event: any) => void } = {};
	if (!disabled) attrs.onClick = onClick;

	return (
		<header {...attrs} className='accordion-item__header'>
			{children}
			<div className='accordion-item__header-icon'>
				<IconButton icon='chevronRight' className='circle' />
			</div>
		</header>
	);
}

export /*bundle */ function Item({ disabled, children, title, index }) {
	const { opened } = useAccordionContext();

	let cls = `accordion-item${index === opened ? ` accordion-item--opened` : ``}`;
	if (disabled) cls += ` accordion-item--disabled`;

	return (
		<article className={cls}>
			{title && (
				<Header disabled={disabled} index={index}>
					{title}
				</Header>
			)}
			<div className='accordion-item__content'>{children}</div>
		</article>
	);
}

export /*bundle */ function Container({ children, active = 0 }) {
	const [opened, setOpened] = React.useState(active);
	const onChange = event => {};

	const value = { onChange, opened, setOpened };
	React.useEffect(() => setOpened(active), [active]);
	const output = React.Children.map(children, (child, index) => {
		return React.cloneElement(child, { index });
	});

	return (
		<AccordionContext.Provider value={value}>
			<div className='accordion'>{output}</div>
		</AccordionContext.Provider>
	);
}

export /*bundle */ const Accordion = { Header, Item, Container };
