import React from 'react';
import type { IProps as IListViewProps } from './list-view.component';

export const useInitialize = (props: IListViewProps) => {
	React.useMemo(() => {
		if (props.plugins) props.store.plugins = props.plugins;
	}, []);
};
