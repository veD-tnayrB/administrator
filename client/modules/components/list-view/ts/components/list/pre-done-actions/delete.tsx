import React from 'react';
import { ConfirmModal, IAction as IModalAction } from '@essential-js/admin/components/modal';
import { IItemAction } from '../list';
import { useListViewContext } from '../../../context';

interface IConfig extends IItemAction {
	modal: {
		title?: string;
		description?: string;
		close: IModalAction;
		confirm: IModalAction;
	};
}

interface IProps {
	onClose: () => void;
	config: IConfig;
	id: string;
}

export const DeleteModal = ({ onClose, config, id }: IProps) => {
	const { store } = useListViewContext();

	const options = {
		title: config.modal.title || 'Delete',
		description: config.modal.description || 'Are you sure you want to delete this item?',
		close: {
			onClick: onClose,
			label: config.modal.close.label,
		},
		confirm: {
			onClick: () => store.remove({ id }),
			label: config.modal.confirm.label,
		},
	};

	return <ConfirmModal {...options} />;
};
