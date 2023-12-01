import * as React from 'react';
import { Sidebar } from './components/main.layout.sidebar';
import { IContext, LayoutContext } from './context';
import { StoreManager } from './store';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'beyond-layout-children': any;
		}
	}
}

export function Layout({ store }: { store: StoreManager }) {
	const contextValue: IContext = {
		store,
	};
	return (
		<LayoutContext.Provider value={contextValue}>
			<main className="main-layout">
				<Sidebar />
				<div className="content">
					<beyond-layout-children />
				</div>
			</main>
		</LayoutContext.Provider>
	);
}
