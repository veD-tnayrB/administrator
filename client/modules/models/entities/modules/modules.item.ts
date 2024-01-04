import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { ModulesItemProvider } from '../../providers/modules/module.item.provider';

export /*bundle*/ interface IModules {
	id: string;
	label: string;
	to: string;
	icon: string;
	timeCreated: Date;
	timeUpdated: Date;
	order: number;
}

export /*bundle*/ class Module extends Item<IModules> {
	protected properties = ['id', 'label', 'icon', 'to', 'timeCreated', 'timeUpdated', 'order'];

	constructor(params: { id: string | undefined } = { id: undefined }) {
		super({
			provider: ModulesItemProvider,
			storeName: 'modules',
			db: config.params.application.localDB,
			...params,
		});
	}
}
