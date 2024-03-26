import React from 'react';
import { Day } from './day';

interface IProps {
	selectedDays: Record<string, string[]>;
}

export const Days = ({ selectedDays }: IProps) => {
	const output = Object.entries(selectedDays).map(([day, times]) => {
		return <Day key={day} day={day} times={times} />;
	});

	return <div className="w-full px-4 flex-col gap-4 h-full max-h-80 overflow-auto">{output}</div>;
};
