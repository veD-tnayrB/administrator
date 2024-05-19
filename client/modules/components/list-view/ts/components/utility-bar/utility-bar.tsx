import React from 'react';
import { Searchbar } from './searchbar/searchbar';
import { ActionsContainer } from './actions/actions';
import { useListViewContext } from '../../context';

export const Utilitybar = () => {
	const { searchbar, actions } = useListViewContext();
	return (
		<header className="utilities-bar">
			<Searchbar {...searchbar} />
			{actions && <ActionsContainer {...actions} />}
		</header>
	);
};
