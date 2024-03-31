import React from 'react';

interface IContext {
	endDate: string;
	isEndDateValid: boolean;
	setFrecuency: (frecuency: string[]) => void;
}

export const FrecuencyManagmentContext = React.createContext<IContext>({} as IContext);
export const useFrecuencyManagmentContext = () => React.useContext(FrecuencyManagmentContext);
