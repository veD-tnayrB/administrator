import { CollectionProvider } from '@essential-js/admin/helpers';

export class WidgetsCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			endpoints: {
				list: 'widgets',
			},
		});
	}

	getDashboard = (params: { userId: string }) => {
		return this.api.get(`widgets/get-dashboard/${params.userId}`);
	};

	getTotals = () => {
		return this.api.get('widgets/get-totals');
	};
}
