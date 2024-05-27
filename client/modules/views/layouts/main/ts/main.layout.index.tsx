import * as React from 'react';
import { Sidebar } from './components/sidebar/main.layout.sidebar';
import { IContext, LayoutContext } from './context';
import { StoreManager } from './store';
import { ToastContainer } from 'react-toastify';
import { useCheckPermissions } from '@essential-js/admin/hooks';
import { SpinnerPage } from '@essential-js/admin/components/spinner';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { session } from '@essential-js/admin/auth';
import { toast } from 'react-toastify';
import { Notification } from './components/notification';
import { Header } from './components/header/main.layout.header';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'beyond-layout-children': any;
		}
	}
}

export function Layout({ store }: { store: StoreManager }) {
	const hasPermissions = useCheckPermissions();
	const [isDOMReady, setIsDOMReady] = React.useState(session.isLoaded);
	useBinder([session.notificationsHandler], () => {
		const current = session.notificationsHandler.current;
		if (!current) return;
		const { title, body } = current;
		toast(<Notification title={title} body={body} />);
	});

	useBinder([session], () => setIsDOMReady(session.isLoaded));

	if (!hasPermissions) return null;
	if (!isDOMReady) return <SpinnerPage displayBrand />;

	const contextValue: IContext = {
		store,
	};
	return (
		<LayoutContext.Provider value={contextValue}>
			<main className="main-layout">
				<Sidebar />
				<div className="w-full">
					<Header />
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
							theme={store.mode}
						/>
					</div>
				</div>
			</main>
		</LayoutContext.Provider>
	);
}
