import React from 'react';

interface ISelectedDay {
	label: string;
	value: number;
	uniqueId: string;
}

interface IContext {
	selectedDays: ISelectedDay[];
	setSelectedDays: React.Dispatch<React.SetStateAction<ISelectedDay[]>>;
	notificationTimes: {};
	setNotificationTimes: React.Dispatch<React.SetStateAction<{}>>;
	orderedDayOfWeek: {
		label: string;
		value: number;
	}[];
}
export const WeeklyOptionContext = React.createContext<IContext>({} as IContext);
export const useWeeklyOptionContext = () => React.useContext(WeeklyOptionContext);
