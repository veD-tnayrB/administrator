/**
 * useActionProperties function
 *
 * This function is designed to process and return action properties for the Button component
 * in the Pragmate UI library. It supports the current API structure of the Button component
 * while maintaining backward compatibility with an older configuration format.
 *
 * The function takes a `properties` object as an argument. If this object contains an `actions` property,
 * it directly returns the `confirm` and `cancel` actions defined within. This is aligned with the current API design.
 *
 * For backward compatibility, the function also handles the scenario where the `actions` property is not present.
 * In this case, it extracts and processes individual properties like `onCancel`, `onConfirm`, `btnConfirm`, and `btnCancel`
 * from the `properties` object. These are then used to construct and return `confirm` and `cancel` action objects
 * with appropriate labels, class names, variants, and onClick handlers.
 *
 * @param {object} properties - The properties object containing either a direct `actions` property
 *                              or individual properties for backward compatibility.
 * @returns An array containing two action objects: confirm and cancel.
 */

export function useActionProperties(properties, setState) {
	const onProcessConfirm = callback => {
		return async (event): Promise<void> => {
			event.stopPropagation();
			setState({ fetching: true });
			await callback();
			setState({ fetching: false });
		};
	};

	if (properties.actions) {
		const confirmProps = { ...properties.actions.confirm };
		const cancelProps = { ...properties.actions.cancel };
		if (!confirmProps.onClick && !properties.onConfirm) {
			throw new Error('ConfirmModal: No confirm function defined');
		}
		if (!cancelProps.onClick && !properties.onCancel) {
			throw new Error('ConfirmModal: No cancel function defined');
		}
		confirmProps.onClick = onProcessConfirm(confirmProps.onClick ?? properties.onConfirm);
		cancelProps.onClick = cancelProps.onClick ?? properties.onCancel;
		return [confirmProps, cancelProps];
	}
	const { onCancel, onConfirm, btnConfirm, btnCancel } = properties;

	const defaultConfirm = {
		label: 'Confirm',
		variant: 'primary',
		onClick: onProcessConfirm(onConfirm),
	};
	const defaultCancel = {
		label: 'Cancel',
		variant: 'primary',
		onClick: onCancel,
		bordered: true,
	};

	const actions = {
		confirm: typeof btnConfirm === 'object' ? { ...defaultConfirm, ...btnConfirm } : defaultConfirm,
		cancel: typeof btnCancel === 'object' ? { ...defaultCancel, ...btnCancel } : defaultCancel,
	};
	return [actions.confirm, actions.cancel];
}
