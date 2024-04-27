import React from 'react';

interface IProps {
	title: string;
	body: string;
}

export const Notification = ({ title, body }: IProps) => {
	return (
		<div>
			<h5>{title}</h5>
			<p>{body}</p>
		</div>
	);
};
