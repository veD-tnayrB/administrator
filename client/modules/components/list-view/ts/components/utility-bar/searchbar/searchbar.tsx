import React from 'react';
import { GeneralSearchbar } from './general';
import { FiltersSearch, IFilters } from './filters/filters';

export interface ISearchbar {
	onSubmit: (values: string) => void;
	filters?: IFilters;
}

export const Searchbar = (props: ISearchbar) => {
	return (
		<section className="search-section">
			<GeneralSearchbar onSubmit={props.onSubmit} />
			<FiltersSearch {...props.filters} />
		</section>
	);
};
