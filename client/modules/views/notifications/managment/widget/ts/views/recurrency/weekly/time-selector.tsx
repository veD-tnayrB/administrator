import React from 'react';
import { Input } from 'pragmate-ui/form';

export const TimeSelector = ({ times, onAddTime, onUpdateTime, onRemoveTime }) => {
	return (
		<div>
			{times.map((time, index) => (
				<div key={index}>
					<Input type="time" value={time} onChange={e => onUpdateTime(index, e.target.value)} />
					<button onClick={() => onRemoveTime(index)}>Remove</button>
				</div>
			))}
			<button onClick={onAddTime}>Add Time</button>
		</div>
	);
};
