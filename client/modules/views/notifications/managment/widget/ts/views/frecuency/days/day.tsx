import React from 'react';
import { Times } from './times/times';

interface IProps {
	day: string;
	times: string[];
}

export const Day = ({ day, times }: IProps) => {
	const [date, , year] = day.split('-');
	return (
		<article className="flex-col gap-2">
			<h6 className="text-lg ">{`${date}  ${year}`}</h6>
			<Times day={day} items={times} />
		</article>
	);
};
