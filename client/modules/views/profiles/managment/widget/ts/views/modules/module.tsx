import React from 'react';
import { Checkbox } from 'pragmate-ui/form';
import type { IModule } from '@essential-js/admin/models';
import { useProfilesManagmentContext } from '../../context';
import { Actions } from './actions';

export const Module = (props: IModule) => {
	const { store } = useProfilesManagmentContext();
	const isChecked = !!store.selectedModules[props.id];
	const ref = React.useRef<HTMLInputElement>(null);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;

		if (checked) {
			const selectedActions: Record<string, true> = {};
			props.actions.forEach((action) => (selectedActions[action.id] = true));

			store.selectedModules = { ...store.selectedModules, [name]: selectedActions };
			return;
		}

		delete store.selectedModules[name];
		store.selectedModules = store.selectedModules;
	};

	const onClick = () => {
		if (!ref.current) return;
		ref.current.click();
	};

	const label = props.label;
	return (
		<li className="flex flex-col">
			<div className="flex items-center">
				<Checkbox ref={ref} className="label text-xl" name={props.id} checked={isChecked} onChange={onChange} />
				<p onClick={onClick} className="label text-xl">
					{label}
				</p>
			</div>

			<Actions items={props.actions} moduleId={props.id} />
		</li>
	);
};
