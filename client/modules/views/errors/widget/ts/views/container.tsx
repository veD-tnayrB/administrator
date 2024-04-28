import React from 'react';
import { Image } from 'pragmate-ui/image';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';
import { session } from '@essential-js/admin/auth';

interface IProps {
	title: string;
	description: string;
	goBack: string;
}

export const Container = ({ title, description, goBack }: IProps) => {
	const backHome = () => {
		const redirectTo = session.user.permissions ? session.user.permissions[0].moduleTo : '/auth/login';
		routing.pushState(redirectTo);
	};

	const iconUrl = '/assets/sidebar/logo-light.svg';

	return (
		<article>
			<div className="logo-container">
				<Image src={iconUrl} />
			</div>
			<div className="content">
				<h1>{title}</h1>
				<p>{description}</p>
				<div className="actions flex gap-4 items-center">
					<Button onClick={backHome} variant="primary">
						{goBack}
					</Button>
				</div>
			</div>
		</article>
	);
};
