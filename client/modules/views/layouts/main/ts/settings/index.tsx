import * as React from 'react';
import { Content } from './content';
import { Modal } from '@essential-js/admin/components/modal';
import { useLayoutContext } from '../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export function SettingsModal() {
	const { store } = useLayoutContext();
	const [isOpen, setIsOpen] = React.useState(false);
	React.useEffect(() => {
		if (!isOpen) return;
		store.settingsManager.load();
	}, [isOpen]);

	useBinder(
		[store],
		() => {
			setIsOpen(store.isSettingsOpen);
		},
		'settings-open',
	);

	if (!isOpen) return null;

	return (
		<Modal className="settings-modal min-w-40">
			<div className="h-full bg-background">
				<Content />
			</div>
		</Modal>
	);
}
