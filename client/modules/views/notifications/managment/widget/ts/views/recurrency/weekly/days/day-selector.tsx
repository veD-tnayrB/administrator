import React from 'react';
import { Checkbox } from 'pragmate-ui/form';
import { useWeeklyOptionContext } from '../context';

export const DaySelector = () => {
	const { selectedDays, setSelectedDays, orderedDayOfWeek } = useWeeklyOptionContext();

	// Esta función maneja la selección/deselección de los días
	const onDayChange = day => {
		// Revisa si el día ya está seleccionado utilizando su identificador único
		const isDaySelected = selectedDays.some(selectedDay => selectedDay.uniqueId === day.uniqueId);

		// Actualiza el estado en consecuencia
		setSelectedDays(
			isDaySelected
				? selectedDays.filter(selectedDay => selectedDay.uniqueId !== day.uniqueId)
				: [...selectedDays, day]
		);
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
