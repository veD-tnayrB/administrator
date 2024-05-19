import React from 'react';
import { ConfirmModal } from '@essential-js/admin/components/modal';
import { IItemAction } from '../list';
import { useListViewContext } from '../../../context';


interface IProps {
	onClose: React.MouseEventHandler<HTMLButtonElement>;
	config: IItemAction;
	id: string;
}

export const DeleteModal = ({ onClose, config, id }: IProps) => {
	const { store } = useListViewContext();

	const options = {
		title: config.modal?.title || 'Delete',
		description: config.modal?.description || 'Are you sure you want to delete this item?',
		close: {
			onClick: onClose,
			label: config.modal?.close.label || "Cancel",
		},
		confirm: {
			onClick: () => store.remove({ id }),
			label: config.modal?.confirm.label || "Confirm",
		},
	};

	return <ConfirmModal {...options} />;
};
