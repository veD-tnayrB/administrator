import React from 'react';

export const RoundedSpinner = () => {
	return (
		<div className="essential-rounded-spinner">
			<svg className="circular" viewBox="0 0 100 100">
				<circle
					className="path"
					cx="50"
					cy="50"
					r="20"
					fill="none"
					strokeWidth="2"
					strokeMiterlimit="10"
				></circle>
			</svg>
		</div>
	);
};
