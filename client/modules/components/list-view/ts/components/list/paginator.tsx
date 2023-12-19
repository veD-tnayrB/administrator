import React from 'react';
import { Button } from 'pragmate-ui/components';
import { useListViewContext } from '../../context';
import { StoreListView } from '../../store-prototype';

export interface IPaginatorProps {
	texts: {
		of: string;
	};

	onNext: StoreListView['next'];
	onPrev: StoreListView['prev'];
}

export const Paginator = (props: IPaginatorProps) => {
	const { store } = useListViewContext();

	const since = `${store.collection.next || 0} - ${store.limit} `;
	const to = `${props?.texts?.of || '/'} ${store.collection.total}`;
	console.log(store.collection);
	return (
		<footer>
			<div className="paginator">
				<div className="left-actions action">
					<Button className="left">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
							/>
						</svg>
					</Button>
					<Button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
						</svg>
					</Button>
				</div>
				<div className="panel">
					<p>
						{since} <span className="to">{to}</span>
					</p>
				</div>

				<div className="right-actions action">
					<Button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
						</svg>
					</Button>
					<Button className="right">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							className="w-6 h-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
							/>
						</svg>
					</Button>
				</div>
			</div>
		</footer>
	);
};
