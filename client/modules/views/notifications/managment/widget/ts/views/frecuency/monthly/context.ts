import React from 'react';

export interface IContext {
	selectedMonthDays: number[];
	setSelectedMonthDays: React.Dispatch<React.SetStateAction<number[]>>;
	selectedWeekDays: any[];
	setSelectedWeekDays: React.Dispatch<React.SetStateAction<[]>>;
	selectedTimes: string[];
	setSelectedTimes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const MonthlyOptionContext = React.createContext<IContext>({} as IContext);
export const useMonthlyOptionContext = () => React.useContext(MonthlyOptionContext);
