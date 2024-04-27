import * as React from 'react';
import { Sidebar } from './components/sidebar/main.layout.sidebar';
import { IContext, LayoutContext } from './context';
import { StoreManager } from './store';
import { useTexts } from '@essential-js/admin/helpers';
import { module } from 'beyond_context';
import { ToastContainer } from 'react-toastify';
import { useCheckPermissions } from '@essential-js/admin/helpers';
import { SpinnerPage } from '@essential-js/admin/components/spinner';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { session } from '@essential-js/admin/auth';
import { toast } from 'react-toastify';
import { Notification } from './components/notification';

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
	useBinder([session.notificationsHandler], () => {
		const { title, body } = session.notificationsHandler.current;
		toast(<Notification title={title} body={body} />);
	});

	if (!hasPermissions) return null;
	if (!ready) return <SpinnerPage />;

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
