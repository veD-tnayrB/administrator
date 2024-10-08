import React from 'react';
import type { IButtonGroupProps } from './type';
import { ButtonGroupContext } from './context';

export /*bundle*/ function ButtonGroup({ orientation = 'row', children, ...props }: IButtonGroupProps): JSX.Element {
	const [selected, setSelected] = React.useState<number>(props.selected);
	let cls = `pui-button-group`;
	cls += orientation ? ` pui-button-group ${orientation}` : '';
	let disabled = !!props.disabled;
	const childrenWithProps = React.Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { index, disabled } as IButtonGroupProps); // Passing the index as a prop
		}
	});

	return (
		<ButtonGroupContext.Provider value={{ selected, setSelected }}>
			<div className={cls}>{childrenWithProps}</div>
		</ButtonGroupContext.Provider>
	);
}
