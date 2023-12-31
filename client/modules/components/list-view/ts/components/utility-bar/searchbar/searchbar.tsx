import React from 'react';
import { GeneralSearchbar } from './general';
import { FiltersSearch, IFilters } from './filters/filters';
import { useListViewContext } from '../../../context';

export interface ISearchbar extends React.HtmlHTMLAttributes<HTMLInputElement> {
	filters?: IFilters;
}

export const Searchbar = (props: ISearchbar) => {
	const { store } = useListViewContext();
	const displayFilters = !!store.propertiesToSearch && !!store.propertiesToSearch.length;

	return (
		<section className="search-section">
			<GeneralSearchbar {...props} />
			{displayFilters && <FiltersSearch {...props.filters} />}
		</section>
	);
};
