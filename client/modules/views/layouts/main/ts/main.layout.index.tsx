import * as React from 'react';
import { Sidebar } from './components/sidebar/main.layout.sidebar';
import { IContext, LayoutContext } from './context';
import { StoreManager } from './store';
import { useTexts } from '@essential-js/admin/helpers';
import { module } from 'beyond_context';
import { ToastContainer } from 'react-toastify';
import { useCheckPermissions } from '@essential-js/admin/helpers';
import { routing } from '@beyond-js/kernel/routing';
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'beyond-layout-children': any;
		}
	}
}

export function Layout({ store }: { store: StoreManager }) {
	const hasPermissions = useCheckPermissions();
	const [ready, texts] = useTexts(module.specifier);

	if (!hasPermissions) return null;
	if (!ready) return;

	const contextValue: IContext = {
		store,
		texts,
	};
	return (
		<LayoutContext.Provider value={contextValue}>
			<main className="main-layout">
				<Sidebar />
				<div className="content">
					<beyond-layout-children />
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
				</div>
			</main>
		</LayoutContext.Provider>
	);
}
