import React from 'react';
import { Checkbox } from 'pragmate-ui/form';
import { useProfilesManagmentContext } from '../../context';
interface IProps {
	id: string;
	name: string;
	description: string;
	moduleId: string;
}

export const Action = (props: IProps) => {
	const { store } = useProfilesManagmentContext();
	const isItemSelected = !!store.selectedModules[props.moduleId] && store.selectedModules[props.moduleId][props.id];

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		if (checked) {
			store.selectedModules = {
				...store.selectedModules,
				[props.moduleId]: { ...store.selectedModules[props.moduleId], [props.id]: true },
			};
			return;
		}
		delete store.selectedModules[props.moduleId][props.id];
		store.selectedModules = store.selectedModules;
	};

	const label = props.name.split('.')[1].charAt(0).toUpperCase() + props.name.split('.')[1].slice(1);

	return (
		<li className="flex items-center">
			<Checkbox onChange={onChange} label={label} name={props.id} checked={isItemSelected} />
		</li>
	);
};
