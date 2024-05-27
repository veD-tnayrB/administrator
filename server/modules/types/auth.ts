export /*bundle*/ interface IAuthUser {
	id: string;
	active: boolean;
	email: string;
	lastNames: string;
	names: string;
	timeCreated: Date;
	profiles: { id: string; name: string }[];
	profileImg: string;
	permissions: { id: string; name: string }[];
	timeUpdated: Date;
	token: string;
}
