import React from 'react';
import { ISelectedDays } from '.';

interface IContext {
	endDate: string;
	selectedDays: ISelectedDays;
	setSelectedDays: React.Dispatch<React.SetStateAction<ISelectedDays>>;
}

export const FrecuencyManagmentContext = React.createContext<IContext>({} as IContext);
export const useFrecuencyManagmentContext = () => React.useContext(FrecuencyManagmentContext);
