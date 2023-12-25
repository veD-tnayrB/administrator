import React from 'react';
import { Spinner } from '@essential-js/admin/components/spinner';

export const Loading = () => {
	return (
		<section className="list-loading">
			<Spinner />
		</section>
	);
};
