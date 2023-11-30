import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { EntityItemProvider } from '../../providers/entities/entity.item.provider';

interface IEntity {
	id: string;
	label: string;
	icon: string;
	to: string;
	timeCreated: Date;
	timeUpdated: Date;
	mode: 'light' | 'dark';
	order: number;
}

export /*bundle*/ class Entity extends Item<IEntity> {
	protected properties = ['id', 'label', 'icon', 'to', 'timeCreated', 'timeUpdated', 'mode', 'order'];

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: EntityItemProvider,
			storeName: 'entities',
			db: config.params.application.localDB,
			...params,
		});
	}
}
