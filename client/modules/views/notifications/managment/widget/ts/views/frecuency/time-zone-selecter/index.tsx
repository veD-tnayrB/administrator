import React from 'react';
import { Select } from '@essential-js/admin/components/select';
import { useNotificationsManagmentContext } from '../../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export const TimeZoneSelector = () => {
	const { store } = useNotificationsManagmentContext();

	const [selectedTimeZone, setSelectedTimeZone] = React.useState(store.frecuencyManager.selectedTimezone);
	const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());
	const timezones = React.useMemo(() => store.frecuencyManager.getTimezones(), []);
	const onTimeZoneChange = selectedTimeZone => {
		store.frecuencyManager.selectedTimezone = selectedTimeZone;
	};
	useBinder([store.frecuencyManager], () => setSelectedTimeZone(store.frecuencyManager.selectedTimezone));

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(new Date().toLocaleTimeString('en-US', { timeZone: selectedTimeZone }));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [selectedTimeZone, onTimeZoneChange]);

	const onChange = event => {
		const { value } = event.target;
		setSelectedTimeZone(value);
		onTimeZoneChange(value);
	};

	console.log('SELECETED TIME ZONE ', selectedTimeZone);

	return (
		<div>
			<Select value={selectedTimeZone} options={timezones} onChange={onChange}></Select>
			<div>
				Current Time in {selectedTimeZone}: {currentTime}
			</div>
		</div>
	);
};
