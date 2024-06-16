import React from 'react';
import { Image } from 'pragmate-ui/image';
import { routing } from '@beyond-js/kernel/routing';
import { Button } from 'pragmate-ui/components';

export /*bundle*/ const NotFound = () => {
	const goBack = () => routing.back();

	const iconUrl = '/assets/sidebar/logo-light.svg';
	return (
		<div className="background-not-found">
			<article>
				<div className="logo-container">
					<Image src={iconUrl} />
				</div>
				<div className="content">
					<h1>Not found</h1>
					<p>
						The element you are trying to access does not exist, try another one or if you think this is an
						error contact an administrator.
					</p>
					<div className="actions flex gap-4 items-center">
						<Button onClick={goBack} variant="primary">
							Go back
						</Button>
					</div>
				</div>
			</article>
		</div>
	);
};
