import { Item } from '@beyond-js/reactive/entities';
import { WidgetItemProvider } from '../../providers/widgets/widget.item.provider';
import config from '@essential-js/admin/config';

export /*bundle*/ interface IWidget {
	id: string;
	active: boolean;
	identifier: string;
	metadata: string;
	order: number;
	timeUpdated: Date;
	timeCreated: Date;
}

export /*bundle*/ class Widget extends Item<IWidget> {
	protected properties = ['id', 'active', 'identifier', 'metadata', 'order', 'timeUpdated', 'timeCreated'];

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: WidgetItemProvider,
			storeName: 'widgets',
			db: config.params.application.localDB,
			...params,
		});
	}
}
