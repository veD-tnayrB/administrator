import React from 'react';
import { Button } from 'pragmate-ui/components';
import { useListViewContext } from '../../../context';

export const EditRemoveActions = () => {
	const { store } = useListViewContext();
	const displayCls = !!store.selectedItems.size ? 'show' : '';
	return (
		<li>
			<div className={`actions ${displayCls}`}>
				<Button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						stroke="currentColor"
						className="lucide lucide-pen-line icon">
						<path d="M12 20h9" />
						<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
					</svg>
				</Button>
				<Button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						stroke="currentColor"
						className="lucide lucide-trash-2 icon">
						<path d="M3 6h18" />
						<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
						<line x1="10" x2="10" y1="11" y2="17" />
						<line x1="14" x2="14" y1="11" y2="17" />
					</svg>
				</Button>
			</div>
		</li>
	);
};
