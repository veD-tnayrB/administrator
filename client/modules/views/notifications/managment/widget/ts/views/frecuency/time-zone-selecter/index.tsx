import React from 'react';
import { Select } from '@essential-js/admin/components/select';

// Este es un ejemplo sencillo, considera usar una librería para manejar zonas horarias como `moment-timezone` o `luxon`
const timeZones = ['UTC', 'America/New_York', 'Europe/Paris']; // Asegúrate de tener una lista completa

export const TimeZoneSelector = () => {
	const [selectedTimeZone, setSelectedTimeZone] = React.useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());
	const onTimeZoneChange = selectedTimeZone => {};

	React.useEffect(() => {
		onTimeZoneChange(selectedTimeZone);
		const intervalId = setInterval(() => {
			setCurrentTime(new Date().toLocaleTimeString('en-US', { timeZone: selectedTimeZone }));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [selectedTimeZone, onTimeZoneChange]);

	const formatedOptions = timeZones.map(timeZone => ({ label: timeZone, value: timeZone }));

	return (
		<div>
			<Select
				value={selectedTimeZone}
				options={formatedOptions}
				onChange={e => setSelectedTimeZone(e.target.value)}></Select>
			<div>
				Current Time in {selectedTimeZone}: {currentTime}
			</div>
		</div>
	);
};
