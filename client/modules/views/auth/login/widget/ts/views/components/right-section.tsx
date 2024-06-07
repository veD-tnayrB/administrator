import React from 'react';

export const RightSection = () => {
	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	const ilustrationNumber = React.useMemo(() => getRandomInt(4), []); // 5 actually
	const ilustration = `/assets/auth/illustration-${ilustrationNumber}.svg`;
	const cls = `illustration-${ilustrationNumber}`;

	return (
		<div className="right-section background-section">
			<img src={ilustration} className={cls} alt="Team up" />
		</div>
	);
};
