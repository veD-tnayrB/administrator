export /*bundle*/ interface IWidget {
	id: string;
	active: boolean;
	identifier: string;
	metadata: string;
	order: number;
	width: number;
	columnPosition?: number;
	rowPosition?: number;
	height: number;
	name: string;
	timeUpdated: Date;
	timeCreated: Date;
}
