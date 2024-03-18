import React from 'react';

interface IContext {
	selectedDays: number[];
	setSelectedDays: React.Dispatch<React.SetStateAction<number[]>>;
	notificationTimes: {};
	setNotificationTimes: React.Dispatch<React.SetStateAction<{}>>;
	orderedDayOfWeek: {
		label: string;
		value: number;
	}[];
}
export const WeeklyOptionContext = React.createContext<IContext>({} as IContext);
export const useWeeklyOptionContext = () => React.useContext(WeeklyOptionContext);
