interface FiltersDialog {
	title: string;
	apply: string;
	label: string;
	reset: string;
}

interface Columns {
	title: string;
	description: string;
	timeInterval: string;
	timeCreated: string;
	timeUpdated: string;
}

interface List {
	columns: Columns;
	actions: {
		columnsSelector: {
			min: string;
			max: string;
		};
		item: {
			edit: string;
			delete: {
				title: string;
				description: string;
				confirm: string;
				close: string;
			};
		};
	};
}

interface SearchBar {
	filtersDialog: FiltersDialog;
	placeholder: string;
}

export interface ITexts {
	actions: {
		create: string;
		columns: string;
	};
	title: string;
	searchbar: SearchBar;
	list: List;
}
