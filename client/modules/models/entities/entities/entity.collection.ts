import { Collection } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { Entity } from './entity.item';
import { EntitiesCollectionProvider } from '../../providers/entities/entities.collection.provider';

export /*bundle*/ class Entities extends Collection {
	constructor() {
		super({
			provider: EntitiesCollectionProvider,
			storeName: 'entities',
			db: config.params.application.localDB,
			localdb: true,
			item: Entity,
		});
	}
}
