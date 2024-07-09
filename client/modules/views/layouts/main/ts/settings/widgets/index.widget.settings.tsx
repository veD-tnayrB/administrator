import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import GridLayout, { Layout } from 'react-grid-layout';
import { widgetStore } from '@essential-js/admin/widgets';
import { WidgetList } from './widget-list';
import { SpinnerPage } from '@essential-js/admin/components/spinner';
import { useLayoutContext } from '../../context';
import { Empty } from './empty';

export const WidgetSettings = () => {
	const { store } = useLayoutContext();
	const settingsManager = store.settingsManager;
	const [, setUpdate] = React.useState({});
	const [width, setWidth] = React.useState(0);
	const ref = React.useRef<HTMLDivElement>(null);

	useBinder([settingsManager], () => setUpdate({}));

	React.useEffect(() => {
		const onChange = () => {
			if (!ref.current) return;
			setWidth(ref.current.offsetWidth);
		};
		onChange();
		window.addEventListener('resize', onChange);
		return () => window.removeEventListener('resize', onChange);
	}, [ref.current]);

	const onLayoutChange = (props: Layout[]) => {
		const items = new Map();

		props.forEach((item: Layout) => {
			items.set(item.i, item);
		});
		settingsManager.selectedWidgets = settingsManager.selectedWidgets.map((widget) => {
			const item = items.get(widget.identifier);
			if (!item) return widget;
			widget.columnPosition = item.x;
			widget.rowPosition = item.y;
			return widget;
		});
	};

	if (settingsManager.selectedWidgets.length === 0 && !settingsManager.fetching) return <Empty />;
	const widgets = settingsManager.selectedWidgets.map((widget, index) => {
		const x = !widget.columnPosition && widget.columnPosition !== 0 ? 0 : widget.columnPosition;
		const y = !widget.rowPosition && widget.rowPosition !== 0 ? index : widget.rowPosition;
		return {
			i: widget.identifier,
			x,
			y,
			w: widget.width,
			h: widget.height,
			minW: widget.width,
			maxW: widget.width,
			minH: widget.height,
			maxH: widget.height,
		};
	});

	const output = widgets.map((record) => {
		const Widget = widgetStore.widgets.get(record.i);
		if (!Widget) return null;
		return (
			<div key={record.i}>
				<Widget />
			</div>
		);
	});
	return (
		<div className="flex h-full">
			<WidgetList />
			<div className="panel w-full" ref={ref}>
				{settingsManager.fetching ? (
					<SpinnerPage />
				) : (
					<GridLayout
						onLayoutChange={onLayoutChange}
						autoSize
						useCSSTransforms
						className="layout"
						layout={widgets}
						cols={12}
						rowHeight={150}
						width={width}
					>
						{output}
					</GridLayout>
				)}
			</div>
		</div>
	);
};
