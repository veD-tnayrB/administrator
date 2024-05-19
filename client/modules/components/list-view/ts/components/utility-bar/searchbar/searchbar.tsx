import React from 'react';
import { GeneralSearchbar } from './general';
import { FiltersSearch, IFilters } from './filters/filters';
import { useListViewContext } from '../../../context';

export interface ISearchbar extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	filters?: IFilters;
	placeholder?: string
}

export const Searchbar = (props: ISearchbar) => {
	const { store } = useListViewContext();
	const displayFilters = !!store.specificFilters && !!store.specificFilters.length;

	return (
		<section className="search-section">
			<GeneralSearchbar {...props} />
			{displayFilters && <FiltersSearch {...props.filters} />}
		</section>
	);
};
