export /*bundle*/ interface IListParams {
	start?: number;
	limit?: number;
	order?: { way?: 'asc' | 'desc'; by?: string };
	where?: { [key: string]: any };
}
