import React, { useId } from 'react';
import { Button } from 'pragmate-ui/components';
import { Checkbox } from 'pragmate-ui/form';
import { Widget, IWidget } from '@essential-js/admin/models';
import { useLayoutContext } from '../../context';

export const WidgetList = () => {
	const { store } = useLayoutContext();
	const settingsManager = store.settingsManager;
	const ref = React.useRef<HTMLDivElement>(null);
	const onSave = settingsManager.save;

	const onClose = () => {
		store.isSettingsOpen = false;
	};

	console.log('SETTINGS MANAGER: ', settingsManager.allWidgets);
	const output = settingsManager.allWidgets.map((record: IWidget, index) => {
		const selected = settingsManager.selectedWidgets.some((item: Widget) => item.id === record.id);
		const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const { checked } = event.target;
			if (!checked) {
				settingsManager.selectedWidgets = settingsManager.selectedWidgets.filter(
					(item: Widget) => item.id !== record.id,
				);
				return;
			}

			const instance = new Widget({ id: record.id });
			instance.set(record);
			instance.columnPosition = 1; // DEFAULT POSITION
			instance.rowPosition = settingsManager.selectedWidgets.length + 1;
			settingsManager.selectedWidgets = [...settingsManager.selectedWidgets, instance];
		};
		return (
			<li key={record.id} className="flex items-center">
				<Checkbox
					id={record.id}
					tabIndex={index + 2}
					label={record.name}
					checked={selected}
					onChange={onChange}
				/>
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
				<Button
					tabIndex={0}
					className="w-full"
					variant="secondary"
					type="button"
					label="Cancel"
					onClick={onClose}
				/>
				<Button tabIndex={1} className="w-full" variant="primary" type="button" label="Save" onClick={onSave} />
			</div>
		</aside>
	);
};
