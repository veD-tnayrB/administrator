import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IWidget, widgetStore } from './dashboard.widget-manager.handler';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

interface IProps {
	data: IWidget[];
}

export /*bundle*/ const WidgetManager = ({ data }: IProps) => {
	const [widgets, setWidgets] = React.useState(widgetStore.widgets);
	useBinder([widgetStore], () => setWidgets(widgetStore.widgets));

	data.sort((a, b) => a.order - b.order);

	const output = data.map(widget => {
		const WidgetComponent = widgets.get(widget.identifier);
		if (!WidgetComponent) {
			console.warn(`${widget.identifier} isnt registered as a widget.`);
			return null;
		}

		return <WidgetComponent key={uuidv4()} metadata={widget.metadata} />;
	});

	return <section className="dashboard flex flex-auto flex-wrap gap-5">{output}</section>;
};
