import React from 'react';
import { Button } from 'pragmate-ui/components';
import { Checkbox } from 'pragmate-ui/form';
import { IWidget } from '@essential-js/admin/models';
import { useLayoutContext } from '../../context';

export const WidgetList = () => {
	const { store } = useLayoutContext();
	const settingsManager = store.settingsManager;
	const ref = React.useRef<HTMLDivElement>(null);
	const onSave = settingsManager.save;

	const onClose = () => {
		store.isSettingsOpen = false;
	};

	const output = settingsManager.allWidgets.map((record: IWidget) => {
		const selected = settingsManager.selectedWidgets.some((item: IWidget) => item.id === record.id);
		const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const { checked } = event.target;
			if (!checked) {
				settingsManager.selectedWidgets = settingsManager.selectedWidgets.filter(
					(item: IWidget) => item.id !== record.id,
				);
				return;
			}

			record.columnPosition = 1; // DEFAULT POSITION
			record.rowPosition = settingsManager.selectedWidgets.length + 1;
			settingsManager.selectedWidgets = [...settingsManager.selectedWidgets, record];
		};
		return (
			<li key={record.id} className="flex items-center">
				<Checkbox id={record.id} label={record.name} checked={selected} onChange={onChange} />
			</li>
		);
	});
	return (
		<aside className="w-60 h-full bg-surface pr-2 flex flex-col justify-between" ref={ref}>
			<div>
				<h1>Widgets</h1>
				<ul>{output}</ul>
			</div>
			<div className="w-full flex gap-4 justify-between">
				<Button className="w-full" variant="secondary" type="button" label="Cancel" onClick={onClose} />
				<Button className="w-full" variant="primary" type="button" label="Save" onClick={onSave} />
			</div>
		</aside>
	);
};
