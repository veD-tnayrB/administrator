import React from 'react';

export /*bundle */ function Preload(props) {
	const { width, height, color, stopAnimation, radio } = props;

	return (
		<span
			className='pui-preload'
			style={{
				width: width || '100%',
				height: height || '14px',
				background: color || '',
				borderRadius: radio || '',
			}}
		>
			<span style={{ display: stopAnimation ? 'none' : 'block' }} />
		</span>
	);
}
