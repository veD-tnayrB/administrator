import React, { useRef } from 'react';
import { useListViewContext } from '../../../../../context';
import { Button } from 'pragmate-ui/components';

export interface IImport {
	label?: string;
}

export const Import = (props: IImport) => {
	const { store } = useListViewContext();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		if (!file) {
			console.log('No file selected.');
			return;
		}

		store.import(file);
	};

	const handleClick = () => {
		if (!fileInputRef.current) return;
		fileInputRef.current.click();
	};

	const title = props.label || 'Import';
	return (
		<>
			<input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
			<Button name="import" title={title} onClick={handleClick} variant="secondary" className="import">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-cloud-upload"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"
					/>
					<path
						fillRule="evenodd"
						d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"
					/>
				</svg>
			</Button>
		</>
	);
};
