import { Item } from '@beyond-js/reactive/entities';
import config from '@essential-js/admin/config';
import { ModulesItemProvider } from '../../providers/modules/module.item.provider';

export /*bundle*/ interface IAction {
	id: string;
	name: string;
	description: string
}

export /*bundle*/ interface IPermission {
	actionId: string
	actionName: string
	moduleId: string
	moduleTo: string

}

export /*bundle*/ interface IModule {
	id: string;
	isNew: boolean;
	label: string;
	to: string;
	icon: string;
	timeCreated: Date;
	timeUpdated: Date;
	order: number;
	actions: IAction[];
}

export /*bundle*/ class Module extends Item<IModule> {
	protected properties = ['id', 'label', 'icon', 'to', 'timeCreated', 'timeUpdated', 'order', 'actions'];

	constructor(params: { id?: string } = { id: undefined }) {
		super({
			provider: ModulesItemProvider,
			storeName: 'modules',
			db: config.params.application.localDB,
			...params,
		});
	}
}
