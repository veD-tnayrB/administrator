import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'pragmate-ui/components';

export interface ITotalItem {
	title: string;
	amount: number | string;
	icon: string;
	to?: string;
}

interface IProps extends ITotalItem {
	index: number;
}

export const TotalItem = ({ title, amount, icon, to, index }: IProps) => {
	const hasLinkAnimations = to ? { whileHover: { scale: 1.05 } } : {};
	const linkCls = to ? 'cursor-pointer' : 'cursor-default';

	const animation = {
		initial: { y: -5, opacity: 0 },
		animate: { y: 0, opacity: 1 },
		...hasLinkAnimations,
		transition: {
			delay: index * 0.2,
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
	};

	to = to || '/';
	return (
		<motion.article {...animation} className="total">
			<Link to={to} className={` ${linkCls}`}>
				<div className="icon" dangerouslySetInnerHTML={{ __html: icon }} />

				<div className="content">
					<p>{title}</p>
					<h3>{amount.toLocaleString('de-DE')}</h3>
				</div>
			</Link>
		</motion.article>
	);
};
