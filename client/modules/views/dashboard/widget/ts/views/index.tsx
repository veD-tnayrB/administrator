import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { SpinnerPage } from '@essential-js/admin/components/spinner';
import { IWidget } from '@essential-js/admin/models';
import { widgetStore } from '@essential-js/admin/widgets';
import * as React from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import { StoreManager } from '../store';

const WIDTH_PLACEHOLDER = 1024;

export /*bundle*/ function View({ store }: { store: StoreManager }) {
	const [, setUpdate] = React.useState({});
	const ref = React.useRef<HTMLDivElement>(null);
	const [width, setWidth] = React.useState(ref.current?.offsetWidth || WIDTH_PLACEHOLDER);
	useBinder([store], () => setUpdate({}));

	React.useEffect(() => {
		store.onWidthChange();
	}, [ref.current]);

	const onWidth = () => {
		requestAnimationFrame(() => {
			if (!ref.current) return;
			setWidth(ref.current.offsetWidth);
		});
	};

	useBinder([store], onWidth, 'resize');

	if (!store.ready) return <SpinnerPage />;

	const widgets = store.selectedWidgets.map((widget: IWidget, index: number) => {
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
			static: true,
		};
	});

	const output = widgets.map((record: Layout) => {
		const Widget = widgetStore.widgets.get(record.i);
		if (!Widget) return null;
		return (
			<div key={record.i} className="flex items-center ">
				{width !== 0 && <Widget />}
			</div>
		);
	});
	return (
		<div className="min-h-screen h-full w-full min-w-screen" ref={ref}>
			<GridLayout
				margin={[15, 10]}
				containerPadding={[0, 0]}
				autoSize
				useCSSTransforms
				className="layout"
				layout={widgets}
				cols={12}
				rowHeight={110}
				width={width}>
				{output}
			</GridLayout>
		</div>
	);
}
