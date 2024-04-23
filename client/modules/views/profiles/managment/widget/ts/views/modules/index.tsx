import React from 'react';
import { useProfilesManagmentContext } from '../../context';
import { Module } from './module';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import type { IModule } from '@essential-js/admin/models';

export const Modules = ({ values }: IModule) => {
	const { store } = useProfilesManagmentContext();
	const [, setUpdate] = React.useState({});
	useBinder([store], () => setUpdate({}));

	const output = store.modules.items.map(item => <Module key={item.id} values={values} {...item} />);

	return <ul className="flex flex-col gap-4">{output}</ul>;
};
