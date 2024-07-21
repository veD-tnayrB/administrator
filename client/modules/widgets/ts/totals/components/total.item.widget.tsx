import React from 'react';
import { Link } from 'pragmate-ui/components';

export interface ITotalItem {
	title: string;
	amount: number | string;
	icon: string;
	to?: string;
}

export const TotalItem = ({ title, amount, icon, to }: ITotalItem) => {
	const linkCls = to ? 'cursor-pointer' : 'cursor-default';

	to = to || '/dashboard';
	return (
		<article className="total">
			<Link href={to} className={` ${linkCls}`}>
				<div className="icon" dangerouslySetInnerHTML={{ __html: icon }} />

				<div className="content">
					<p>{title}</p>
					<h3>{amount.toLocaleString('de-DE')}</h3>
				</div>
			</Link>
		</article>
	);
};
