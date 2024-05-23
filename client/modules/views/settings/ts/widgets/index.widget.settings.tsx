import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { useSettingsContext } from '../context';
import GridLayout from 'react-grid-layout';
import { widgetStore } from '@essential-js/admin/widgets';
import { WidgetList } from './widget-list';

export const WidgetSettings = () => {
	const { store } = useSettingsContext();
	const [, setUpdate] = React.useState({});
	const [layout, setLayout] = React.useState(0);
	const ref = React.useRef<HTMLDivElement>(null);

	useBinder([store], () => setUpdate({}));

	React.useEffect(() => {
		const onChange = () => {
			if (!ref.current) return;
			setLayout(ref.current.offsetWidth);
		};

		onChange();
		window.addEventListener('resize', onChange);
		return () => window.removeEventListener('resize', onChange);
	}, []);

	const widgets = store.selectedWidgets.map((widget, index) => {
		return {
			i: widget.identifier,
			x: widget.columnPosition || 1,
			y: widget.rowPosition || index,
			w: widget.width,
			h: widget.height,
			minW: widget.width,
			maxW: widget.width,
			minH: widget.height,
			maxH: widget.height,
			static: false,
		};
	});
	console.log('widgets: ', widgets, store.selectedWidgets);
	const output = widgets.map((record) => {
		const Widget = widgetStore.widgets.get(record.i);
		return (
			<div key={record.i}>
				<Widget />
			</div>
		);
	});
	return (
		<div className="min-h-screen flex min-w-screen">
			<div className="panel min-h-screen w-full" ref={ref}>
				<GridLayout autoSize className="layout" layout={widgets} cols={12} rowHeight={150} width={layout}>
					{output}
				</GridLayout>
			</div>
			<WidgetList />
		</div>
	);
};
