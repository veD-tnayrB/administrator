import { CollectionProvider } from '@essential-js/admin/helpers';

export class WidgetsCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			endpoints: {
				list: 'widgets',
			},
		});
	}

	getTotals = () => {
		return this.api.get('widgets/get-totals');
	};
}
