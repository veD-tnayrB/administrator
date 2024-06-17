import React from 'react';

export const Notification = ({ title, body }: { title: string; body: string }) => {
	return (
		<div>
			<h5>{title}</h5>
			<p>{body}</p>
		</div>
	);
};
