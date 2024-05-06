import React from 'react';
import { ConfirmModal } from '@essential-js/admin/components/modal';
import { IModule, IAction } from '@essential-js/admin/models';
import { useModulesManagmentContext } from '../../context';

interface IProps {
	onToggleDeleteModal: () => void;
	id: string,
	name: string;
}

export const DeleteModal = ({ id, name, onToggleDeleteModal }: IProps) => {
	const { setItem } = useModulesManagmentContext();

	const onRemove = () => {
		setItem((currentValue: IModule) => {
			const actions = currentValue.actions.filter((item: IAction) => item.id !== id);
			return { ...currentValue, actions };
		})

		onToggleDeleteModal()
	}

	const options = {
		title: `Are you sure you want to delete ${name}?`,
		description: `This operation is irreversible and may cause unexpected behavior in the application caused by lack of permissions, if you do not know what you are doing exit this window and contact an administrator.`,

		close: {
			onClick: onToggleDeleteModal,
			label: 'Cancel',
		},
		confirm: {
			onClick: onRemove,
			label: 'Yes, remove',
		},
	};

	return <ConfirmModal {...options} />;
}
