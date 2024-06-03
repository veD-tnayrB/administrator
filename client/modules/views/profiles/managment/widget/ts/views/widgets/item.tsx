import React from 'react';
import { Checkbox } from 'pragmate-ui/form';
import { useProfilesManagmentContext } from '../../context';
import { IWidget } from '@essential-js/admin/models';

export const Widget = ({ description, name, id }: IWidget) => {
	const { store } = useProfilesManagmentContext();
	const isChecked = !!store.selectedWidgets[id];
	const ref = React.useRef<HTMLInputElement>(null);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;

		if (checked) {
			store.selectedWidgets = { ...store.selectedWidgets, [name]: true };
			return;
		}

		const currentSelectedWidgets = { ...store.selectedWidgets };
		delete currentSelectedWidgets[name];
		store.selectedWidgets = currentSelectedWidgets;
	};

	const onClick = () => {
		if (!ref.current) return;
		ref.current.click();
	};

	return (
		<li className="flex flex-col w-full">
			<div className="flex gap-2 items-center w-full">
				<Checkbox ref={ref} className="label text-xl" name={id} checked={isChecked} onChange={onChange} />
				<div onClick={onClick} className="text-content w-full">
					<p onClick={onClick} className="label text-base">
						{name}
					</p>

					<p className="label text-sm">{description}</p>
				</div>
			</div>
		</li>
	);
};
