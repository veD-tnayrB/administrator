import React from 'react';
import { Select } from '@essential-js/admin/components/select';
import { useProfilesManagmentContext } from '../context';

export const Modules = () => {
	const { store } = useProfilesManagmentContext();

	return (
		<div>
			{/* <Select
				options={[
					{ label: 'Users', value: 'b' },
					{ label: 'Notifications', value: 'a' },
				]}
				onSelect={onChange}
				name="modules"
				value={values.modules}
				label="Modules"
			/> */}
		</div>
	);
};
