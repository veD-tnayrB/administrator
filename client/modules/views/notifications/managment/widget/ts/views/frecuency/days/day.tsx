import React from 'react';
import { Times } from './times/times';

interface IProps {
	day: string;
	times: string[];
}

export const Day = ({ day, times }: IProps) => {
	return (
		<article className="flex-col gap-4">
			<h6 className="text-lg">{day}</h6>
			<Times day={day} items={times} />
		</article>
	);
};
