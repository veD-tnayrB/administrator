export /*bundle*/ interface IUser {
	id: string;
	isNew: boolean;
	active: boolean;
	email: string;
	lastNames: string;
	profiles: string[];
	names: string;
	profileImg: string;
	timeCreated: Date;
	timeUpdated: Date;
}
