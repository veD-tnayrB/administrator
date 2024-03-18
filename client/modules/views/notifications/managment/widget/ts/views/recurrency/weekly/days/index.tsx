import React from 'react';
import { DaySelector } from './day-selector';
import { DayTimes } from './times/times';

export const Days = () => {
	return (
		<div className="flex-col gap-4">
			<DaySelector />
			<DayTimes />
		</div>
	);
};
