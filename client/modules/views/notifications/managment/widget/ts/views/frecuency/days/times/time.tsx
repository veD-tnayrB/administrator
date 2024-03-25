import React from 'react';
import { Input } from 'pragmate-ui/form';

interface IProps {
	item: string;
	index: number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onRemove: (event: React.MouseEvent) => void;
}

export const Time = ({ item, index, onChange, onRemove }: IProps) => {
	const isRemoveDisabled = index === 0;
	return (
		<div className="w-full flex gap-4 items-center">
			<Input type="time" className="w-full" value={item} onChange={onChange} data-index={index} />
			{/* <Button onClick={onRemove} disabled={isRemoveDisabled}>
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
					className="lucide lucide-trash-2">
					<path d="M3 6h18" />
					<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
					<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
					<line x1="10" x2="10" y1="11" y2="17" />
					<line x1="14" x2="14" y1="11" y2="17" />
				</svg>
			</Button> */}
		</div>
	);
};
