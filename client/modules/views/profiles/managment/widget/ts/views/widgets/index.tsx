import React from 'react';
import { IValues } from '../form';
import {
	CollapsibleContainer,
	CollapsibleHeader,
	CollapsibleContent,
} from '@essential-js/admin/components/collapsible';
import { useProfilesManagmentContext } from '../../context';
import { Widget } from './item';

interface IProps {
	values: IValues;
}

export const Widgets = ({ values }: IProps) => {
	const { store } = useProfilesManagmentContext();
	const output = store.widgets.items.map((item) => <Widget key={item.id} values={values} {...item} />);

	return (
		<CollapsibleContainer>
			<CollapsibleHeader>
				<h3>Associated widgets</h3>
			</CollapsibleHeader>
			<CollapsibleContent>
				<ul className="flex flex-col gap-4">{output}</ul>
			</CollapsibleContent>
		</CollapsibleContainer>
	);
};
