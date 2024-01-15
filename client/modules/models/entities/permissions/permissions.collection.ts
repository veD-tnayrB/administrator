import { Collection } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { Permission } from './permission.item';
import { PermissionsCollectionProvider } from '../../providers/permissions/permissions.collection.provider';

export /*bundle*/ class Permissions extends Collection {
	constructor() {
		super({
			provider: PermissionsCollectionProvider,
			storeName: 'permissions',
			db: config.params.application.localDB,
			localdb: true,
			item: Permission,
		});
	}
}
