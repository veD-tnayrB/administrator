import React from 'react';
import { ConfirmModal } from '@essential-js/admin/components/modal';
import { useListViewContext } from '../../../context';

interface IProps {
	onToggleDeleteModal: () => void;
}

export const BulkRemoveModal = ({ onToggleDeleteModal }: IProps) => {
	const { store } = useListViewContext();

	const options = {
		title: 'Delete',
		description: `Are you sure you want to delete ${store.selectedItems.size} items?`,
		close: {
			onClick: onToggleDeleteModal,
			label: 'Cancel',
		},
		confirm: {
			onClick: () => {
				store.bulkRemove();
				onToggleDeleteModal();
			},
			label: 'Yes, remove',
		},
	};

	return <ConfirmModal {...options} />;
};
