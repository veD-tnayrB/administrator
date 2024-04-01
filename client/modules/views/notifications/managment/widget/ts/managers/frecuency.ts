import { ReactiveModel } from '@beyond-js/reactive/model';
import { Frequency, RRule, RRuleSet } from 'rrule';
import { Frecuencies } from '../views/frecuency/frecuency-select';
import { rrulestr } from 'rrule';

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
		this.reflectChangesInCalendar();
	}

	#endDate = null;
	get endDate() {
		return this.#endDate;
	}

	set endDate(value) {
		this.#endDate = value;
	}

	#isEndDateValid = false;
	get isEndDateValid() {
		return this.#isEndDateValid;
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

	load = (rrules: string[]) => {
		console.log('RESSULTS => ', rrules);
		let result = {
			frecuency: '',
			selectedDays: {},
		};

		rrules.forEach(ruleStr => {
			const rule = rrulestr(ruleStr);

			if (!result.frecuency) {
				result.frecuency = RRule.FREQUENCIES[rule.options.freq];
			}

			const dayKey = rule.options.dtstart.toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});

			const timeString = rule.options.dtstart.toISOString().split('T')[1].slice(0, 5);

			if (result.selectedDays[dayKey]) {
				result.selectedDays[dayKey].push(timeString);
			} else {
				result.selectedDays[dayKey] = [timeString];
			}
		});
		console.log('RESULT => ', result);
		this.#selectedFrecuency = result.frecuency as Frecuencies;
		this.#selectedDays = result.selectedDays;
	};

	reflectChangesInCalendar = () => {
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
		let rrules = [];

		Object.entries(this.#selectedDays).forEach(([dateString, times]) => {
			const date = new Date(dateString);
			times.forEach(time => {
				const [hour, minute] = time.split(':');

				const freq = {
					Weekly: Frequency.WEEKLY,
					Monthly: Frequency.MONTHLY,
					Daily: Frequency.DAILY,
				};

				const rrule = new RRule({
					freq: freq[this.#selectedFrecuency],
					dtstart: new Date(date.setHours(parseInt(hour), parseInt(minute))),
					until: new Date(this.#endDate + `T10:00:00Z`),
				});

				rrules.push(rrule.toString());
			});
		});

		return rrules;
	};

	reset = () => {
		this.#selectedFrecuency = null;
		this.#selectedDays = {};
		this.triggerEvent();
	};
}
