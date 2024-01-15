import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { PermissionsItemProvider } from '../../providers/permissions/permission.item.provider';

export /*bundle*/ interface IPermission {
	id: string;
	name: string;
	timeCreated: Date;
	timeUpdated: Date;
}

export /*bundle*/ class Permission extends Item<IPermission> {
	protected properties = ['id', 'name', 'timeCreated', 'timeUpdated'];

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: PermissionsItemProvider,
			storeName: 'permissions',
			db: config.params.application.localDB,
			...params,
		});
	}
}
