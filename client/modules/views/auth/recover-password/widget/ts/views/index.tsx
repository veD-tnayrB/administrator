import { motion } from 'framer-motion';
import React from 'react';
import { StoreManager } from '../store';
import { IContext, RecoverPasswordContext } from './context';
import { Form } from './form';
import { RightSection } from './right-section';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const animate = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: {
			duration: 0.5,
		},
	};
	const contextValue: IContext = {
		store,
	};
	return (
		<motion.div {...animate}>
			<RecoverPasswordContext.Provider value={contextValue}>
				<div className="recover-password auth-view">
					<Form />
					<RightSection />
				</div>
			</RecoverPasswordContext.Provider>
		</motion.div>
	);
}
