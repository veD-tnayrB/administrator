/**
 * @todo: the button action interface should be moved to a common place
 * and be the same used in the button component.
 */
export interface IButtonAction {
	label?: string;
	className?: string;
	variant?: string;
	onClick?: () => void | Promise<void>;
	disabled?: boolean;
}

export interface IConfirmModalActions {
	confirm: IButtonAction;
	cancel: IButtonAction;
}

export interface IConfirmModalProps {
	show?: boolean;
	title?: string;
	text?: string;
	actions?: IConfirmModalActions;
	centered?: boolean;
	className?: string;
	/**
	 * @deprecated
	 */
	btnConfirm?: Record<string, any>;
	/*
	 * @deprecated
	 */
	btnCancel?: Record<string, any>;
	children?: React.ReactNode;
	onCancel?: () => void;
	onConfirm?: () => void;
	onClose?: () => void;
	// ... any other props needed for ConfirmModal
}
