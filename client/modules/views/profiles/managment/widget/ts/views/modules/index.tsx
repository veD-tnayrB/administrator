import React from 'react';
import { useProfilesManagmentContext } from '../../context';
import { Module } from './module';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { IValues } from '../form';
import {
	CollapsibleContainer,
	CollapsibleHeader,
	CollapsibleContent,
} from '@essential-js/admin/components/collapsible';
interface IProps {
	values: IValues;
}

export const Modules = ({ values }: IProps) => {
	const { store } = useProfilesManagmentContext();
	const [, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}));

	const output = store.modules.items.map((item) => <Module key={item.id} values={values} {...item} />);

	return (
		<CollapsibleContainer>
			<CollapsibleHeader>
				<h2>Associated modules</h2>
			</CollapsibleHeader>
			<CollapsibleContent>
				<ul className="flex flex-col gap-4">{output}</ul>
			</CollapsibleContent>
		</CollapsibleContainer>
	);
};
