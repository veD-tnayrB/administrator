import React from 'react';

interface IContext {
	endDate: string;
	isEndDateValid: boolean;
	setFrecuency: (frecuency: Record<string, string[]>) => void;
	setIsSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FrecuencyManagmentContext = React.createContext<IContext>({} as IContext);
export const useFrecuencyManagmentContext = () => React.useContext(FrecuencyManagmentContext);
