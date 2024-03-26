import React, { useState } from 'react';
import { CollapsibleContainer, CollapsibleHeader, CollapsibleContent } from 'pragmate-ui/collapsible';
import { DayPicker } from 'react-day-picker';
import { Select } from '@essential-js/admin/components/select';
import { Button } from 'pragmate-ui/components';
import { Days } from './days/days';
import { FrecuencyManagmentContext } from './context';
import { RRuleSet, RRule, Frequency } from 'rrule';
import { Alert, ITypes as AlertTypes } from 'pragmate-ui/alert';
import { Input } from 'pragmate-ui/form';

export type ISelectedDays = Record<string, string[]>;

enum Frecuencies {
	DAILY = 'Daily',
	WEEKLY = 'Weekly',
	MONTHLY = 'Monthly',
}

interface IProps {
	endDate: string;
	onEndDateChange: React.ChangeEventHandler<HTMLInputElement>;
	isEndDateValid: boolean;
}

const SUNDAY = 6;

const todaySelectedDay = new Date().toDateString();
globalThis.r = RRule;

export const Frecuency = ({ endDate, onEndDateChange, isEndDateValid }: IProps) => {
	const [selectedDays, setSelectedDays] = useState<ISelectedDays>({ [todaySelectedDay]: ['09:00'] });
	const [frecuency, setFrecuency] = React.useState(Frecuencies.DAILY);

	const onSelect = (selectedDates: Date[]) => {
		const newSelectedDays = {};
		selectedDates.forEach(day => {
			const key = day.toDateString();
			const currentValue = selectedDays[key] || ['09:00'];
			newSelectedDays[key] = currentValue;
		});

		setSelectedDays(newSelectedDays);
	};

	// Guardar configuración de frecuencia
	const onSave = () => {
		// TODO: save frecuency
	};

	const updateSelectedDays = (selectedFrecuency?: Frecuencies) => {
		const ruleSet = new RRuleSet();
		const existingDates = Object.keys(selectedDays).map(day => new Date(day));

		const start =
			existingDates.length > 0 ? new Date(Math.min(...existingDates.map(date => date.getTime()))) : new Date();

		const until = new Date(endDate + `T10:00:00Z`);
		console.log('ULTIM  => ', until, endDate);
		const frecuency = selectedFrecuency || Frecuencies.DAILY;

		switch (frecuency) {
			case Frecuencies.DAILY:
				ruleSet.rrule(new RRule({ freq: Frequency.DAILY, dtstart: start, until }));
				break;
			case Frecuencies.WEEKLY:
				const selectedDaysOfWeek = Object.keys(selectedDays).map(day => {
					const unformatedWeekDay = new Date(day).getDay();
					const weekDay = unformatedWeekDay === 0 ? SUNDAY : unformatedWeekDay - 1;
					return weekDay;
				});
				console.log('SELECTED DAY OF THE WEEN -> ', selectedDaysOfWeek);
				ruleSet.rrule(
					new RRule({ freq: Frequency.WEEKLY, dtstart: start, until, byweekday: selectedDaysOfWeek })
				); // Ejemplo con Lunes
				break;
			case Frecuencies.MONTHLY:
				const daysOfTheMonth = Object.keys(selectedDays).map(day => new Date(day).getDate());
				ruleSet.rrule(
					new RRule({ freq: Frequency.MONTHLY, dtstart: start, until, bymonthday: daysOfTheMonth })
				); // Ejemplo con el 1er día del mes
				break;
			default:
				break;
		}

		const dates = ruleSet.all();

		const selectedDay = selectedDays[start.toDateString()] || ['09:00'];

		const newSelectedDays = {};
		dates.forEach(day => {
			const key = day.toDateString();
			const currentValue = selectedDays[key] || selectedDay;
			newSelectedDays[key] = currentValue;
		});

		setSelectedDays(newSelectedDays);
	};

	const onChangeFrecuency = (selected: { value: Frecuencies; label: Frecuencies }) => {
		setFrecuency(selected.value);
		updateSelectedDays(selected.value);
	};

	const formatedSelectedDays = Object.keys(selectedDays).map(day => new Date(day));

	const onReset = () => {
		setSelectedDays({});
	};

	console.log('selectedDays => ', selectedDays);

	const contextValue = {
		selectedDays,
		setSelectedDays,
		endDate,
		isEndDateValid,
	};

	const theresAScheduleEmpty = Object.values(selectedDays).some(times => times.some(time => !time));
	const disabled = Object.keys(selectedDays).length === 0 || theresAScheduleEmpty || !endDate || !isEndDateValid;

	const frencuenciesOpts = Object.values(Frecuencies).map(frencuency => ({ value: frencuency, label: frencuency }));

	console.log('END DATE => ', endDate);
	return (
		<FrecuencyManagmentContext.Provider value={contextValue}>
			<CollapsibleContainer>
				<CollapsibleHeader>
					<h3>Frecuency</h3>
				</CollapsibleHeader>
				<CollapsibleContent>
					{!endDate && <Alert type={AlertTypes.Warning}>Please specify an end date</Alert>}

					<Input
						label="End date"
						required
						value={endDate}
						name="endDate"
						onChange={onEndDateChange}
						type="date"
						className="fixed-label"
					/>

					<div className="flex gap-4">
						<DayPicker
							modifiersClassNames={{
								selected: 'rdp-day_selected',
							}}
							selected={formatedSelectedDays}
							onSelect={onSelect}
							mode="multiple"
						/>

						<Days selectedDays={selectedDays} />
					</div>
					<Select
						label="Frequency"
						value={frecuency}
						onChange={onChangeFrecuency}
						options={frencuenciesOpts}
						disabled={!endDate}
					/>

					<div className="flex justify-end">
						<Button variant="secondary" onClick={onReset}>
							Reset
						</Button>
						<Button variant="primary" disabled={disabled} onClick={onSave}>
							Save Frecuency
						</Button>
					</div>
				</CollapsibleContent>
			</CollapsibleContainer>
		</FrecuencyManagmentContext.Provider>
	);
};
