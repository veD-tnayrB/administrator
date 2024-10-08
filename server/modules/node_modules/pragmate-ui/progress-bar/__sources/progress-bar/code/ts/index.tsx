import React from 'react';
import type { IProps } from './types';
export /* bundle */ function ProgressBar(props: IProps) {
	const { value, maxValue = 100, variant = 'primary' } = props;

	const percentage = (value / maxValue) * 100;

	const cls = variant ? `progress-bar__progress ${variant}` : 'progress-bar__progress';
	return (
		<div className="pui-progress-bar">
			<span className={cls} style={{ width: `${percentage}%` }}>
				{value}%
			</span>
		</div>
	);
}
