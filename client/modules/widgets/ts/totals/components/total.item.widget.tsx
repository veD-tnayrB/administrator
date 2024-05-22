import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'pragmate-ui/components';

export interface ITotalItem {
	title: string;
	amount: number | string;
	icon: string;
	to?: string;
}

export const TotalItem = ({ title, amount, icon, to }: ITotalItem) => {
	const hasLinkAnimations = to ? { whileHover: { scale: 1.05 } } : {};
	const linkCls = to ? 'cursor-pointer' : 'cursor-default';

	const animation = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		...hasLinkAnimations,
	};

	to = to || '/dashboard';
	return (
		<motion.article {...animation} className="total">
			<Link href={to} className={` ${linkCls}`}>
				<div className="icon" dangerouslySetInnerHTML={{ __html: icon }} />

				<div className="content">
					<p>{title}</p>
					<h3>{amount.toLocaleString('de-DE')}</h3>
				</div>
			</Link>
		</motion.article>
	);
};
