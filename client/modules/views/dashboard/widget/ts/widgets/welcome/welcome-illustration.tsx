import React from 'react';

export const WelcomeIllustration = () => {
	const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280">
			<path
				fill={primary}
				fillOpacity="1"
				d="M0,96L40,122.7C80,149,160,203,240,218.7C320,235,400,213,480,224C560,235,640,277,720,277.3C800,277,880,235,960,218.7C1040,203,1120,213,1200,192C1280,171,1360,117,1400,90.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
		</svg>
	);
};
