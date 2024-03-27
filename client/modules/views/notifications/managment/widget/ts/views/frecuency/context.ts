import React from 'react';

interface IContext {
	endDate: string;
	isEndDateValid: boolean;
}

export const FrecuencyManagmentContext = React.createContext<IContext>({} as IContext);
export const useFrecuencyManagmentContext = () => React.useContext(FrecuencyManagmentContext);
