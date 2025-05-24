import { SpinnerPage } from '@essential-js/admin/components/spinner';
import { useStore } from '@essential-js/admin/hooks';
import { motion } from 'framer-motion';
import React from 'react';
import { StoreManager } from '../store';
import { LeftSection } from './components/left-section';
import { RightSection } from './components/right-section';
import { IContext, LoginContext } from './context';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	useStore(store);
	if (!store.isReady) return <SpinnerPage displayBrand />;

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
			<LoginContext.Provider value={contextValue}>
				<div className="login-view auth-view">
					<LeftSection />
					<RightSection />
				</div>
			</LoginContext.Provider>
		</motion.div>
	);
}
