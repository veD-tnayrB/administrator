import * as React from 'react';
import { StoreManager } from '../store';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { SpinnerPage } from '@essential-js/admin/components/spinner';
import GridLayout, { Layout } from 'react-grid-layout';
import { widgetStore } from '@essential-js/admin/widgets';
import { IWidget } from '@essential-js/admin/models';
import { layoutStore } from '@essential-js/admin/layout/main.widget';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [, setUpdate] = React.useState({});
	const [width, setWidth] = React.useState(0);
	const ref = React.useRef<HTMLDivElement>(null);
	useBinder([store], () => setUpdate({}));

	React.useEffect(() => {
		const onChange = () => {
			requestAnimationFrame(() => {
				if (!ref.current) return;
				setWidth(ref.current.offsetWidth);
			});
		};

		onChange();
		layoutStore.on('resize', onChange);
		window.addEventListener('resize', onChange);
		return () => {
			layoutStore.off('resize', onChange);
			window.removeEventListener('resize', onChange);
		};
	}, []);

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
		return (
			<div key={record.i}>
				<Widget />
			</div>
		);
	});
	return (
		<div className="min-h-screen h-full w-full min-w-screen" ref={ref}>
			<GridLayout
				margin={[0, 0]}
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
		</div>
	);
}
