import React from 'react';
import { Input, Checkbox } from 'pragmate-ui/form';

interface IProps {
	endDate: string;
	isEndEnabled: boolean;
	setEndDate: React.Dispatch<React.SetStateAction<string>>;
	setIsEndEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EndDateDaily = ({ endDate, isEndEnabled, setEndDate, setIsEndEnabled }: IProps) => {
	return (
		<div className="flex-col gap-4">
			<Checkbox
				className="flex-row items-center"
				label="Set End Date"
				checked={isEndEnabled}
				onChange={e => setIsEndEnabled(e.target.checked)}
			/>
			{isEndEnabled && <Input type="date" value={endDate} onChange={event => setEndDate(event.target.value)} />}
		</div>
	);
};
