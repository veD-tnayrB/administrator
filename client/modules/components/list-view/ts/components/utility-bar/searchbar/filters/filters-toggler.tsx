import React from 'react';

interface IProps {
	label?: string;
}

export const FiltersToggler = (props: IProps) => {
	return (
		<div className="filter-toggler">
			{props.label && <p>{props.label}</p>}
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
				/>
			</svg>
		</div>
	);
};
