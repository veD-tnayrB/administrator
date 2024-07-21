import React from 'react';
import { Button } from 'pragmate-ui/components';
import { useListViewContext } from '../../context';
import { IPaginator } from './paginator';
import { LengthHandler } from './length-handler';

export const PaginatorContent = (props: IPaginator) => {
	const { store } = useListViewContext();

	const since = `${store.currentPage || 0}-${store.limit} `;
	const to = `${props?.texts?.of || ' of '} ${store.collection.total}`;
	const isFirstPage = store.currentPage === 1;
	const isLastPage = store.currentPage === store.totalPages;

	return (
		<>
			<div className="paginator">
				<div className="panel">
					<p>
						{since}
						{to}
					</p>
				</div>

				<div className="left-actions action">
					<Button
						aria-label="Fist page"
						name="first-page"
						className="left"
						onClick={store.onFirstPage}
						disabled={isFirstPage}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-chevrons-left"
						>
							<path d="m11 17-5-5 5-5" />
							<path d="m18 17-5-5 5-5" />
						</svg>
					</Button>
					<Button
						name="previous-page"
						aria-label="Previous page"
						onClick={store.onPrev}
						disabled={isFirstPage}
						className="disabled-class-to-teest"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-chevron-left"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
					</Button>
				</div>

				<div className="right-actions action">
					<Button aria-label="Next page" name="next-page" onClick={store.onNext} disabled={isLastPage}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-chevron-right"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</Button>
					<Button
						name="last-page"
						aria-label="Last page"
						className="right"
						disabled={isLastPage}
						onClick={store.onLastPage}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-chevrons-right"
						>
							<path d="m6 17 5-5-5-5" />
							<path d="m13 17 5-5-5-5" />
						</svg>
					</Button>
				</div>
			</div>
			<LengthHandler />
		</>
	);
};
