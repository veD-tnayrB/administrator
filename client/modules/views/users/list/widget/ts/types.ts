interface FiltersDialog {
	title: string;
	apply: string;
	label: string;
	reset: string;
}

interface Columns {
	names: string;
	lastNames: string;
	email: string;
	timeCreated: string;
	timeUpdated: string;
}

interface List {
	columns: Columns;
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
