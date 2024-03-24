import React, { useState } from 'react';
import { CollapsibleContainer, CollapsibleHeader, CollapsibleContent } from 'pragmate-ui/collapsible';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import { Input } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';

export const Frecuency = () => {
	const [selectedDays, setSelectedDays] = useState([]);
	const [timesByDay, setTimesByDay] = useState({});

	const formatDate = date => date.toISOString().split('T')[0];
	// Maneja la selección de días
	const handleDayClick = (date, { selected }) => {
		console.log('PARAMS => ', date, selected);
		const dateString = date;
		setSelectedDays([...selectedDays, dateString]);
		if (selected) {
			// Si ya estaba seleccionado, deseleccionarlo
			setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== dateString));

			// Eliminar también los horarios para ese día
			const newTimesByDay = { ...timesByDay };
			delete newTimesByDay[dateString];
			setTimesByDay(newTimesByDay);
		} else {
			// Si no estaba seleccionado, agregarlo a la lista
			setSelectedDays([...selectedDays, dateString]);

			// Agregar un horario predeterminado para el día
			setTimesByDay({
				...timesByDay,
				[dateString]: ['09:00'], // Horario predeterminado
			});
		}
	};

	// Agrega un nuevo horario para un día específico
	const addNotificationTime = (day, time) => {
		setTimesByDay({
			...timesByDay,
			[day]: [...(timesByDay[day] || []), time],
		});
	};

	// Actualiza un horario existente para un día específico
	const updateNotificationTime = (day, index, newTime) => {
		const updatedDayTimes = timesByDay[day];
		updatedDayTimes[index] = newTime;
		setTimesByDay({ ...timesByDay, [day]: updatedDayTimes });
	};

	// Guardar configuración de frecuencia
	const onSave = () => {
		// TODO: save frecuency
	};

	console.log(
		'VALUES => ',
		selectedDays,
		selectedDays.map(day => new Date(day))
	);

	return (
		<CollapsibleContainer>
			<CollapsibleHeader>
				<h3>Frecuency</h3>
			</CollapsibleHeader>
			<CollapsibleContent>
				<DayPicker
					modifiersClassNames={{
						selected: 'rdp-day_selected',
					}}
					selectedDays={selectedDays.map(day => new Date(day))}
					onDayClick={handleDayClick}
					mode="multiple"
				/>
				{/* {selectedDays.map(dayString => (
					<div key={dayString}>
						<h3>{dayString}</h3>
						{(timesByDay[dayString] || []).map((time, index) => (
							<Input
								key={index}
								type="time"
								value={time}
								onChange={e => updateNotificationTime(dayString, index, e.target.value)}
							/>
						))}
						<Button onClick={() => addNotificationTime(dayString, '')}>Add Time</Button>
					</div>
				))} */}
				<Button onClick={onSave}>Save Frecuency</Button>
			</CollapsibleContent>
		</CollapsibleContainer>
	);
};
