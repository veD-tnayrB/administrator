import React from 'react';
import { Profile } from '@essential-js/admin/models';
import { Button } from 'pragmate-ui/components';

export const Row = ({ item }: { item: Profile }) => {
	return (
		<div>
			<span>{item.name}</span>
			<span>{item.description}</span>
			{/* <td>{item.timeCreated}</td>
			<td>{item.timeUpdated}</td> */}
		</div>
	);
};
