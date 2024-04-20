import React from 'react';
import { FrecuencyManagmentContext } from './context';
import {
	CollapsibleContainer,
	CollapsibleHeader,
	CollapsibleContent,
} from '@essential-js/admin/components/collapsible';

import { Alert, ITypes as AlertTypes } from 'pragmate-ui/alert';
import { CalendarDays } from './calendar-days';
import { Actions } from './actions';
// import { FrencuencySelect } from './frecuency-select';
import { EndDate } from './end-date';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { useNotificationsManagmentContext } from '../../context';

export type ISelectedDays = Record<string, string[]>;

interface IProps {
	endDate: string;
	onEndDateChange: React.ChangeEventHandler<HTMLInputElement>;
	isEndDateValid: boolean;
	setFrecuency: (frecuency: Record<string, string[]>) => void;
}

export const Frecuency = ({ endDate, onEndDateChange, isEndDateValid, setFrecuency }: IProps) => {
	const { store } = useNotificationsManagmentContext();
	const [isSectionOpen, setIsSectionOpen] = React.useState(false);
	const [, setUpdate] = React.useState({});
	useBinder([store.frecuencyManager], () => setUpdate({}));
	const contextValue = {
		endDate,
		isEndDateValid,
		setFrecuency,
		setIsSectionOpen,
	};

	const contentCls = isSectionOpen ? ' collapsible__content--opened' : '';

	return (
		<FrecuencyManagmentContext.Provider value={contextValue}>
			<CollapsibleContainer open={isSectionOpen} onToggle={setIsSectionOpen}>
				<CollapsibleHeader>
					<h3>Frecuency</h3>
				</CollapsibleHeader>
				<CollapsibleContent className={contentCls}>
					{!endDate && <Alert type={AlertTypes.Warning}>Please specify an end date</Alert>}

					<EndDate onChangeEndDate={onEndDateChange} />
					<CalendarDays />
					{/* <FrencuencySelect /> */}
					<Actions />
				</CollapsibleContent>
			</CollapsibleContainer>
		</FrecuencyManagmentContext.Provider>
	);
};
