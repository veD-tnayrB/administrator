import React from 'react';
import { Checkbox } from 'pragmate-ui/form';
import type { IModule } from '@essential-js/admin/models';
import { useProfilesManagmentContext } from '../../context';
import { Actions } from './actions';

export const Module = (props: IModule) => {
	const { store } = useProfilesManagmentContext();
	const isChecked = !!props.values.modules[props.id];

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		if (checked) {
			store.selectedModules = { ...store.selectedModules, [name]: {} };
			return;
		}

		delete store.selectedModules[name];
		store.selectedModules = store.selectedModules;
	};
	const label = props.label;
	return (
		<li className="flex flex-col">
			<div className="flex items-center">
				<Checkbox name={props.id} checked={isChecked} onChange={onChange} />
				<p className="label text-xl">{label}</p>
			</div>

			<Actions items={props.actions} moduleId={props.id} />
		</li>
	);
};
