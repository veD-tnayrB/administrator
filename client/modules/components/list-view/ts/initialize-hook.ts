import React from 'react';
import type { IListViewProps } from './list-view.component';

export const useInitialize = (props: IListViewProps) => {
	React.useMemo(() => {
		const plugins: string[] = props.plugins || [];
		props.store.plugins = plugins;
	}, []);
};
