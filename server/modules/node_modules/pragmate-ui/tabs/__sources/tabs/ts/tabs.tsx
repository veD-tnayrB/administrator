import React from 'react';
import { useTabsContext } from './context';
import { useScroll } from './use-scroll';
import { Tab } from './tab';
import { ITabProps } from './interfaces';

export /*bundle*/ const Tabs = ({ children, className }) => {
	const { activeTab } = useTabsContext();
	const ref = React.useRef<HTMLDivElement>(null);
	useScroll(ref, activeTab);

	const output = children.map((item, index) => {
		const props = { ...item.props, index, key: index };
		if (React.isValidElement(item) && (item.type as React.FC) === Tab) {
			const tabChild = item as React.ReactElement<ITabProps>;
			return React.cloneElement(tabChild, props);
		}
		return item;
	});
	const cls = `pui-tabs-menu${className ? ` ${className}` : ''}`;
	return (
		<header className={cls}>
			<div className='tabs' ref={ref}>
				{output}
			</div>
		</header>
	);
};
