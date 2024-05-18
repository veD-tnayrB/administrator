import { ItemProvider } from '@essential-js/admin/helpers';
import { IModule } from '../../entities/modules/modules.item';

export class ModulesItemProvider extends ItemProvider<IModule> {
	constructor() {
		super({
			endpoints: {
				publish: 'module',
				get: 'module',
				delete: 'module',
			},
		});
	}
}
