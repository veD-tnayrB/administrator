import React from 'react';
import { CollapsibleContainer, CollapsibleHeader, CollapsibleContent } from 'pragmate-ui/collapsible';
import { FrecuencyManagmentContext } from './context';
import { Alert, ITypes as AlertTypes } from 'pragmate-ui/alert';
import { CalendarDays } from './calendar-days';
import { Actions } from './actions';
import { FrencuencySelect } from './frecuency-select';
import { EndDate } from './end-date';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { useNotificationsManagmentContext } from '../../context';

export type ISelectedDays = Record<string, string[]>;

interface IProps {
	endDate: string;
	onEndDateChange: React.ChangeEventHandler<HTMLInputElement>;
	isEndDateValid: boolean;
	setFrecuency: (frecuency: string[]) => void;
}

export const Frecuency = ({ endDate, onEndDateChange, isEndDateValid, setFrecuency }: IProps) => {
	const { store } = useNotificationsManagmentContext();
	const [, setUpdate] = React.useState({});
	useBinder([store.frecuencyManager], () => setUpdate({}));
	const contextValue = {
		endDate,
		isEndDateValid,
		setFrecuency,
	};

	return (
		<FrecuencyManagmentContext.Provider value={contextValue}>
			<CollapsibleContainer>
				<CollapsibleHeader>
					<h3>Frecuency</h3>
				</CollapsibleHeader>
				<CollapsibleContent>
					{!endDate && <Alert type={AlertTypes.Warning}>Please specify an end date</Alert>}

					<EndDate onChangeEndDate={onEndDateChange} />
					<CalendarDays />
					<FrencuencySelect />
					<Actions />
				</CollapsibleContent>
			</CollapsibleContainer>
		</FrecuencyManagmentContext.Provider>
	);
};
