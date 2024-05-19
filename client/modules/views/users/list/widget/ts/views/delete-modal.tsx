import React from 'react';
import { ConfirmModal } from '@essential-js/admin/components/modal';
import { useUsersListContext } from '../context';

interface IProps {
	onClose: (event: React.MouseEvent) => void;
	id: string;
}

export const DeleteModal = ({ onClose, id }: IProps) => {
	const { store } = useUsersListContext();

	const options = {
		title: 'Delete',
		description: 'Are you sure you want to delete this item?',
		close: {
			onClick: onClose,
			label: 'Cancel',
		},
		confirm: {
			onClick: () => store.remove({ id }),
			label: 'Accept',
		},
	};

	return <ConfirmModal {...options} />;
};
