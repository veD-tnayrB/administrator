import { Item } from '@beyond-js/reactive/entities';
import { WidgetItemProvider } from '../../providers/widgets/widget.item.provider';
import config from '@essential-js/admin/config';

export /*bundle*/ interface IWidget {
	id: string;
	isNew: boolean;
	active: boolean;
	identifier: string;
	metadata: string;
	order: number;
	width: number;
	columnPosition?: number;
	rowPosition?: number;
	height: number;
	name: string;
	timeUpdated: Date;
	timeCreated: Date;
}

export /*bundle*/ class Widget extends Item<IWidget> {
	protected properties = [
		'id',
		'active',
		'identifier',
		'metadata',
		'order',
		'width',
		'height',
		'name',
		'columnPosition',
		'rowPosition',
		'timeUpdated',
		'timeCreated',
	];

	constructor(params: { id?: string | undefined } = { id: undefined }) {
		super({
			provider: WidgetItemProvider,
			storeName: 'widgets',
			db: config.params.application.localDB,
			...params,
		});
	}
}
