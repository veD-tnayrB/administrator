import React, { ReactElement, ReactNode } from 'react';

type ListProps<T> = {
	items: T[];
	className?: string;
	index?: string;
	specs;
	control: React.ElementType<{ data: T }>;
	childrenPosition?: 'top' | 'bottom';
	container?: keyof JSX.IntrinsicElements;
	children?: ReactNode;
};

export /*bundle */ function List<T>({
	items,
	className,
	children,
	index = 'id',
	specs,
	childrenPosition = 'top',
	control,
	container = 'ul',
}: ListProps<T>): ReactElement {
	const Container = container;
	const Control = control;

	// const output: ReactNode[] = items.map((data, idx) => {
	// 	return <Control key={(data as any)[index as string] || idx} data={data} />;
	// });
	try {
		const output: ReactNode[] = items.map((item, idx) => {
			return React.createElement(
				Control as React.ElementType<{ data: T; index: number; item: T; specs: Record<string, any> }>,
				{
					key: (item as any)[index] || idx,
					index: idx,
					data: item,
					item,
					specs,
				}
			);
		});
		return (
			<Container className={className}>
				{childrenPosition === 'top' && children ? children : null}
				{output}
				{childrenPosition === 'bottom' && children ? children : null}
			</Container>
		);
	} catch (e) {
		console.error(`invalid items in list0`, items);
	}
}
