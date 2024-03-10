import React from 'react';
import { useListViewContext } from '../../../context';
import { ISearchbar } from './searchbar';

export const GeneralSearchbar = (props: ISearchbar) => {
	const { store } = useListViewContext();
	const [values, setValues] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [hasBeenSubmitted, setHasBeenSubmitted] = React.useState(false);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues(event.target.value);
	};

	const onSearch = () => {
		onFocus();
		store.search(values);
		setHasBeenSubmitted(true);
	};

	const onClear = () => {
		onFocus();
		setValues('');
		store.clearSearch();
		setHasBeenSubmitted(false);
	};

	const onFocus = () => inputRef?.current?.focus();

	const onKeyDown = event => {
		if (event.key === 'Enter') {
			onSearch();
		}
	};

	const displayClear = values || hasBeenSubmitted;
	const resetCls = displayClear ? 'show' : '';

	return (
		<div className="list-view-searchbar-container" onClick={onFocus}>
			<svg xmlns="http://www.w3.org/2000/svg" onClick={onFocus} fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
			<div className="pui-input list-view-searchbar">
				<input
					{...props}
					ref={inputRef}
					className="list-view-searchbar"
					name="list-view-searchbar"
					value={values}
					onChange={onChange}
					type="text"
					onKeyDown={onKeyDown}
				/>
			</div>

			{displayClear && (
				<button onClick={onClear} className={`clear-button ${resetCls}`} type="reset">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			)}
		</div>
	);
};
