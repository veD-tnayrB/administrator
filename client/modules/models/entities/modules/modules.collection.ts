import { Collection } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { Module } from './modules.item';
import { ModulesCollectionProvider } from '../../providers/modules/modules.collection.provider';

export /*bundle*/ class Modules extends Collection {
	constructor() {
		super({
			provider: ModulesCollectionProvider,
			storeName: 'modules',
			db: config.params.application.localDB,
			localdb: true,
			item: Module,
		});
	}
}
