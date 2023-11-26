import { ItemProvider } from '@essential-js/admin/helpers';

export class WidgetItemProvider extends ItemProvider {
	constructor() {
		super({
			collection: 'widgets',
		});
	}
}
