import React from 'react';
import { Button } from 'pragmate-ui/components';
import { useSettingsContext } from '../context';
import { Checkbox } from 'pragmate-ui/form';

export const WidgetList = () => {
	const { store } = useSettingsContext();
	const ref = React.useRef<HTMLDivElement>(null);

	const onSave = () => {
		store.save();
	};

	const output = store.allWidgets.map((record) => {
		const selected = store.selectedWidgets.some((item) => item.id === record.id);
		const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const { checked } = event.target;

			if (!checked) {
				store.selectedWidgets = store.selectedWidgets.filter((item) => item.id !== record.id);
				return;
			}

			record.columnPosition = 1; // DEFAULT POSITION
			record.rowPosition = store.selectedWidgets.length + 1;
			store.selectedWidgets = [...store.selectedWidgets, record];
		};
		return (
			<li key={record.id} className="flex items-center">
				<Checkbox id={record.id} label={record.name} checked={selected} onChange={onChange} />
			</li>
		);
	});
	return (
		<aside className="w-60 bg-surface px-2 py-4 max-h-screen flex flex-col justify-between" ref={ref}>
			<div>
				<h1>Widgets</h1>
				<ul>{output}</ul>
			</div>
			<div className="w-full flex justify-end">
				<Button className="w-full" variant="primary" type="button" label="Save" onClick={onSave} />
			</div>
		</aside>
	);
};
