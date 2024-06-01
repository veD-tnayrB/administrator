import { IProfile } from './profiles';
import { IUser } from './users';

export /*bundle*/ interface INotification {
	id: string;
	isNew: boolean;
	title: string;
	description: string;
	icon: string;
	status: string;
	timeCreated: Date;
	timeUpdated: Date;
	users: IUser[];
	profiles: IProfile[];
	endDate: string;
	frecuency: string[];
}
