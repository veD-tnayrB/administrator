import { ReactiveModel } from '@beyond-js/reactive/model';
import { Frequency, Options, RRule, RRuleSet } from 'rrule';
import { Frecuencies } from '../views/frecuency/frecuency-select';
import { rrulestr } from 'rrule';
import * as moment from 'moment-timezone';

export class FrecuencyManager extends ReactiveModel<FrecuencyManager> {
	#selectedDays: Record<string, string[]> = {};
	get selectedDays() {
		return this.#selectedDays;
	}

	set selectedDays(value) {
		this.#selectedDays = value;
		this.triggerEvent();
	}

	#selectedFrecuency = Frecuencies.DAILY;
	get selectedFrecuency() {
		return this.#selectedFrecuency;
	}

	set selectedFrecuency(value) {
		this.#selectedFrecuency = value;
		this.displayFrecuencyPattern();
	}

	#endDate = null;
	get endDate() {
		return this.#endDate;
	}

	set endDate(value) {
		this.#endDate = value;
		this.#filterByEndDate(value);
	}

	#isEndDateValid = false;
	get isEndDateValid() {
		return this.#isEndDateValid;
	}

	#selectedTimezone: string = `${moment.tz.guess()}`;
	get selectedTimezone() {
		return this.#selectedTimezone;
	}

	set selectedTimezone(value) {
		this.#selectedTimezone = value;
		this.triggerEvent();
	}

	#frecuencyHandlers: Record<string, (ruleInstance: RRuleSet, start: Date, until: Date) => Record<string, string[]>>;

	constructor() {
		super();
		this.#frecuencyHandlers = {
			[Frecuencies.DAILY]: this.#dailyHandler,
			[Frecuencies.WEEKLY]: this.#weeklyHandler,
			[Frecuencies.MONTHLY]: this.#monthlyHandler,
		};
	}

	load = ({ rrules, endDate }: { rrules: string[]; endDate: string }) => {
		this.#endDate = endDate;
		let result = {
			frecuency: '',
			selectedDays: {},
		};

		rrules.forEach(ruleStr => {
			const rule = rrulestr(ruleStr);

			if (!result.frecuency) {
				const frecuencies = [Frecuencies.MONTHLY, Frecuencies.WEEKLY, Frecuencies.DAILY];
				result.frecuency = frecuencies[rule.options.freq - 1];
			}

			const dayKey = rule.options.dtstart.toDateString();

			const timeString = rule.options.dtstart.toISOString().split('T')[1].slice(0, 5);

			if (result.selectedDays[dayKey]) {
				result.selectedDays[dayKey].push(timeString);
			} else {
				result.selectedDays[dayKey] = [timeString];
			}
		});
		this.#selectedFrecuency = result.frecuency as Frecuencies;
		this.#selectedDays = result.selectedDays;
		this.triggerEvent();
	};

	displayFrecuencyPattern = () => {
		const ruleSet = new RRuleSet();
		const existingDates = Object.keys(this.#selectedDays).map(day => new Date(day));

		const start =
			existingDates.length > 0 ? new Date(Math.min(...existingDates.map(date => date.getTime()))) : new Date();

		const until = new Date(this.#endDate + `T10:00:00Z`);
		const frecuency = this.#selectedFrecuency;

		const callback = this.#frecuencyHandlers[frecuency];
		const newSelectedDays = callback(ruleSet, start, until);
		this.#selectedDays = newSelectedDays;
		this.triggerEvent();
	};

	#dailyHandler = (ruleInstance: RRuleSet, start: Date, until: Date) => {
		ruleInstance.rrule(new RRule({ freq: Frequency.DAILY, dtstart: start, until }));

		const newSelectedDays: Record<string, string[]> = {};
		const dates = ruleInstance.all();
		const selectedDay = this.#selectedDays[start.toDateString()] || ['09:00'];
		dates.forEach(day => {
			const key = day.toDateString();
			const currentValue = this.#selectedDays[key] || selectedDay;
			newSelectedDays[key] = currentValue;
		});

		return newSelectedDays;
	};

	#weeklyHandler = (ruleInstance: RRuleSet, start: Date, until: Date) => {
		const SUNDAY = 6;

		const selectedDaysOfWeek = Object.keys(this.#selectedDays).map(day => {
			const unformatedWeekDay = new Date(day).getDay();
			const weekDay = unformatedWeekDay === 0 ? SUNDAY : unformatedWeekDay - 1;
			return weekDay;
		});

		ruleInstance.rrule(new RRule({ freq: Frequency.WEEKLY, dtstart: start, until, byweekday: selectedDaysOfWeek }));
		const dates = ruleInstance.all();

		const weeklySchedules = {};
		Object.entries(this.#selectedDays).forEach(([date, times]) => {
			const unformatedWeekDay = new Date(date).getDay();
			const weekDay = unformatedWeekDay === 0 ? SUNDAY : unformatedWeekDay - 1;
			weeklySchedules[weekDay] = times;
		});

		const newSelectedDays: Record<string, string[]> = {};
		dates.forEach(day => {
			const key = day.toDateString();
			const unformatedWeekDay = new Date(day).getDay();
			const weekDayKey = unformatedWeekDay === 0 ? SUNDAY : unformatedWeekDay - 1;
			const currentValue = weeklySchedules[weekDayKey];
			newSelectedDays[key] = currentValue;
		});

		return newSelectedDays;
	};

	#monthlyHandler = (ruleInstance: RRuleSet, start: Date, until: Date) => {
		const daysOfTheMonth = Object.keys(this.#selectedDays).map(day => new Date(day).getDate());
		ruleInstance.rrule(new RRule({ freq: Frequency.MONTHLY, dtstart: start, until, bymonthday: daysOfTheMonth }));

		const dates = ruleInstance.all();
		const dailySchedules = {};
		Object.entries(this.#selectedDays).forEach(([date, times]) => {
			const dayDate = new Date(date);
			const day = dayDate.getDate();
			dailySchedules[day] = times;
		});

		const newSelectedDays: Record<string, string[]> = {};
		dates.forEach(day => {
			const key = day.toDateString();
			const dayKey = day.getDate();
			const currentValue = dailySchedules[dayKey];
			newSelectedDays[key] = currentValue;
		});

		return newSelectedDays;
	};

	generateRRuleFrecuency = () => {
		const rrules = [];

		// Asegurarse de que #selectedTimezone tenga un valor predeterminado o haya sido establecido
		const timezone = this.#selectedTimezone || moment.tz.guess();

		Object.entries(this.#selectedDays).forEach(([dateString, times]) => {
			times.forEach(time => {
				const [hour, minute] = time.split(':').map(Number);
				console.log('HOUR', hour, minute);
				const formattedHour = hour.toString().padStart(2, '0');
				const formattedMinute = minute.toString().padStart(2, '0');

				// Ahora la cadena de fecha y hora estará correctamente formateada.
				const dateTimeString = `${dateString} ${formattedHour}:${formattedMinute}`;
				const localDate = moment.tz(dateTimeString, 'YYYY-MM-DD HH:mm', timezone);

				if (!localDate.isValid()) {
					console.error('Invalid localDate', localDate);
					return;
				}
				const utcDate = localDate.clone().tz('UTC');

				const dtstart = utcDate.toDate();
				const until = moment
					.tz(this.#endDate + ` 23:59:59`, 'YYYY-MM-DD HH:mm:ss', timezone)
					.tz('UTC')
					.toDate();

				console.log('D START => ', {
					dtstart: {
						dtstart,
						utcDate,
						localDate,
					},
					until,
				});
				// Opciones básicas para RRule
				let rruleOptions: Partial<Options> = {
					dtstart: dtstart,
					until: until,
				};

				if (this.#selectedFrecuency) {
					const freq = {
						Weekly: RRule.WEEKLY,
						Monthly: RRule.MONTHLY,
						Daily: RRule.DAILY,
					};

					if (freq[this.#selectedFrecuency]) {
						rruleOptions.freq = freq[this.#selectedFrecuency];
					}
				}

				const rrule = new RRule(rruleOptions);
				rrules.push(rrule.toString());
			});
		});

		console.log('RRULES:', rrules);
		return rrules;
	};

	#filterByEndDate = (date: Date) => {
		const endDate = new Date(date);
		const fixedSelectedDays = {};
		Object.entries(this.#selectedDays).forEach(([date, times]) => {
			const day = new Date(date);
			if (day <= endDate) {
				fixedSelectedDays[date] = times;
			}
		});

		this.#selectedDays = fixedSelectedDays;
	};

	getTimezones = () => {
		const timeZones = moment.tz.names();
		return timeZones.map(zone => {
			const offset = moment.tz(zone).format('Z');
			return { label: `${zone} (UTC${offset})`, value: zone };
		});
	};

	reset = () => {
		this.#selectedFrecuency = null;
		this.#selectedDays = {};
		this.triggerEvent();
	};
}
