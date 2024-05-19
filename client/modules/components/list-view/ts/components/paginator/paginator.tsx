import React from 'react';
import { ILengthHandler } from './length-handler';
import { PaginatorContent } from './content';

export interface IPaginator {
	texts?: {
		of: string;
	};
	lengthHandler?: ILengthHandler;
}

export const Paginator = (props: IPaginator) => {
	// const { store } = useListViewContext();
	// const theresOnlyOnePage = store.currentPage === 1 && store.totalPages === 1;
	return (
		<footer className="list-view-paginator">
			{' '}
			<PaginatorContent {...props} />
		</footer>
	);
};
