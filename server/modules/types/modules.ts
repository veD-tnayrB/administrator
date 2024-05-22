export /*bundle*/ interface IAction {
	id: string;
	name: string;
	description: string;
}

export /*bundle*/ interface IModule {
	id: string;
	label: string;
	to: string;
	icon: string;
	timeCreated: Date;
	timeUpdated: Date;
	active: boolean;
	order: number;
	actions: IAction[];
}
