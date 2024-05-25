import { CollectionProvider } from '@essential-js/admin/helpers';
import { IWidget } from '../../entities/widgets/widget.item';

export class WidgetsCollectionProvider extends CollectionProvider {
	constructor() {
		super({
			endpoints: {
				list: 'widgets',
			},
		});
	}

	getDashboard = (params: {
		userId: string;
	}): Promise<
		{ status: true; data: { entries: IWidget[]; allWidgets: IWidget[] } } | { status: false; error: string }
	> => {
		return this.api.get(`widgets/get-dashboard/${params.userId}`);
	};

	saveDashboard = (params: IWidget[]) => {
		return this.api.post('widgets/save-dashboard', { data: params });
	};

	getTotals = () => {
		return this.api.get('widgets/get-totals');
	};
}
