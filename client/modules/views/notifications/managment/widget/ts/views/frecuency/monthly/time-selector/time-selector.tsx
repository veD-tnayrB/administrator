import React from 'react';
import { Button } from 'pragmate-ui/components';
import { useMonthlyOptionContext } from '../context';
import { Time } from './time';

export const TimeSelector = () => {
	const { selectedTimes, setSelectedTimes } = useMonthlyOptionContext();

	const onAddTime = () => {
		setSelectedTimes([...selectedTimes, '']);
	};

	const output = selectedTimes.map((time, index) => (
		<Time key={`${time}-${index}`} index={index} time={time} onAddTime={onAddTime} />
	));

	return (
		<div className="flex-col gap-4">
			<div>
				<Button variant="primary" onClick={onAddTime}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-plus">
						<path d="M5 12h14" />
						<path d="M12 5v14" />
					</svg>
					Add time
				</Button>
			</div>
			<div className="flex-col gap-4">{output}</div>
		</div>
	);
};
