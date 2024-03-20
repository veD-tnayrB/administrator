import React from 'react';
import { Checkbox } from 'pragmate-ui/form';
import { useWeeklyOptionContext } from '../context';

export const DaySelector = () => {
	const { selectedDays, setSelectedDays, orderedDayOfWeek, setNotificationTimes, notificationTimes } =
		useWeeklyOptionContext();

	const onDayChange = day => {
		const selectedId = day.uniqueId;
		const isDayAlreadySelected = selectedDays.some(item => item.uniqueId === selectedId);

		const updatedSelectedDays = isDayAlreadySelected
			? selectedDays.filter(d => d.uniqueId !== selectedId)
			: [...selectedDays, day];
		setSelectedDays(updatedSelectedDays);

		if (isDayAlreadySelected) {
			const updatedTimes = { ...notificationTimes };
			delete updatedTimes[selectedId];
			setNotificationTimes(updatedTimes);
		} else {
			setNotificationTimes({ ...notificationTimes, [selectedId]: ['09:00'] });
		}
	};

	// Renderiza los checkboxes para los días de la semana
	const output = orderedDayOfWeek.map((day, index) => {
		// Crea un identificador único para cada día
		const uniqueId = `${day.label}-${index}`;
		return (
			<Checkbox
				key={uniqueId}
				label={day.label}
				checked={selectedDays.some(selectedDay => selectedDay.uniqueId === uniqueId)}
				onChange={() => onDayChange({ ...day, uniqueId })}
			/>
		);
	});

	return <div>{output}</div>;
};
