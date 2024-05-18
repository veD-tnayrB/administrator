import { ItemProvider } from '@essential-js/admin/helpers';
import { IWidget } from '../../entities/widgets/widget.item';

export class WidgetItemProvider extends ItemProvider<IWidget> {
	constructor() {
		super({
			endpoints: {
				publish: 'widget',
				get: 'widget',
				delete: 'widget',
			},
		});
	}
}
