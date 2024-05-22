export /*bundle*/ interface IPermission {
	actionId: string;
	actionName: string;
	moduleId: string;
	moduleTo: string;
}

export /*bundle*/ interface IProfile {
	id: string;
	name: string;
	description: string;
	timeCreated: Date;
	timeUpdated: Date;
	active: boolean;
}
