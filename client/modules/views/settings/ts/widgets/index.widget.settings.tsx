import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { useSettingsContext } from '../context';
import GridLayout from 'react-grid-layout';
import { widgetStore } from '@essential-js/admin/widgets';

export const WidgetSettings = () => {
	const { store } = useSettingsContext();
	const [, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}));

	const widgets = store.selectedWidgets.map((widget) => {
		return {
			i: widget.identifier,
			x: widget.columnPosition,
			y: widget.rowPosition,
			w: widget.width,
			h: widget.height,
			minW: widget.width,
			maxW: widget.width,
			minH: widget.height,
			maxH: widget.height,
			static: false,
		};
	});

	const output = widgets.map((record) => {
		const Widget = widgetStore.widgets.get(record.i);
		console.log(record.i, record, Widget);
		return (
			<div key={record.i}>
				<Widget />
			</div>
		);
	});
	return (
		<GridLayout className="layout" layout={widgets} cols={12} rowHeight={30} width={1200}>
			{output}
		</GridLayout>
	);
};
