import React from 'react';
import { v4 as uuid } from 'uuid';
import { Checkbox } from 'pragmate-ui/form';
import { useNotificationsManagmentContext } from '../../../context';

export const UsersRow = ({ propertiesToDisplay, item, ...props }) => {
	const { store } = useNotificationsManagmentContext();
	const output = propertiesToDisplay.map((property: string) => {
		let value = item[property];

		if (property === 'timeCreated' || property === 'timeUpdated') {
			value = new Date(value).toLocaleString().split(',')[0];
		}
		return (
			<span className="field" key={uuid()}>
				{value}
			</span>
		);
	});

	const onSelect = () => {
		store.users.selectItem({ id: item.id });
	};

	const isItemSelected = store.users.selectedItems.has(item.id);

	return (
		<li className="row">
			<span className="check-item field">
				<Checkbox checked={isItemSelected} onChange={onSelect} id={item.id} />
			</span>
			{output}
		</li>
	);
};
