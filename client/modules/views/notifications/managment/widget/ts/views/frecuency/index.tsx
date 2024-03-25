import React, { useState } from 'react';
import { CollapsibleContainer, CollapsibleHeader, CollapsibleContent } from 'pragmate-ui/collapsible';
import { DayPicker } from 'react-day-picker';
import { Select } from '@essential-js/admin/components/select';
import { Button } from 'pragmate-ui/components';
import { Days } from './days/days';
import { FrecuencyManagmentContext } from './context';
import { RRuleSet, RRule, Frequency } from 'rrule';

export type ISelectedDays = Record<string, string[]>;

enum Frecuencies {
	DAILY = 'Daily',
	WEEKLY = 'Weekly',
	MONTHLY = 'Monthly',
}

export const Frecuency = ({ endDate }: { endDate: string }) => {
	const [selectedDays, setSelectedDays] = useState<ISelectedDays>({});
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

	const onChangeFrecuency = (selected: { value: Frecuencies; label: Frecuencies }) => {
		setFrecuency(selected.value);
		updateSelectedDays();
	};

	const formatedSelectedDays = Object.keys(selectedDays).map(day => new Date(day));

	const updateSelectedDays = () => {
		const ruleSet = new RRuleSet();
		const start = new Date();
		const until = endDate;
		console.log('ULTIM  => ', until);

		return;
		switch (frecuency) {
			case Frecuencies.DAILY:
				ruleSet.rrule(new RRule({ freq: Frequency.DAILY, dtstart: start, until }));
				break;
			case Frecuencies.WEEKLY:
				ruleSet.rrule(new RRule({ freq: Frequency.WEEKLY, dtstart: start, until, byweekday: [RRule.MO] })); // Ejemplo con Lunes
				break;
			case Frecuencies.MONTHLY:
				ruleSet.rrule(new RRule({ freq: Frequency.MONTHLY, dtstart: start, until, bymonthday: [1] })); // Ejemplo con el 1er día del mes
				break;
			default:
				break;
		}

		const dates = ruleSet.all();
		console.log('DATES => ', dates);
		// setSelectedDays(dates);
	};

	const contextValue = {
		selectedDays,
		setSelectedDays,
	};

	const theresAScheduleEmpty = Object.values(selectedDays).some(times => times.some(time => !time));
	const disabled = Object.keys(selectedDays).length === 0 || theresAScheduleEmpty;

	const frencuenciesOpts = Object.values(Frecuencies).map(frencuency => ({ value: frencuency, label: frencuency }));

	return (
		<FrecuencyManagmentContext.Provider value={contextValue}>
			<CollapsibleContainer>
				<CollapsibleHeader>
					<h3>Frecuency</h3>
				</CollapsibleHeader>
				<CollapsibleContent>
					<Select value={frecuency} onChange={onChangeFrecuency} options={frencuenciesOpts} />
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

					<div className="flex justify-end">
						<Button variant="primary" disabled={disabled} onClick={onSave}>
							Save Frecuency
						</Button>
					</div>
				</CollapsibleContent>
			</CollapsibleContainer>
		</FrecuencyManagmentContext.Provider>
	);
};
