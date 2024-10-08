import React, { Ref } from 'react';
import { Icon } from 'pragmate-ui/icons';
import { Spinner } from 'pragmate-ui/spinner';
import { RippleEffect } from 'pragmate-ui/ripple';
import tippy from 'tippy.js';
import { IButtonProps } from './interface';
import { ButtonGroupContext } from '../button-group/context';

const { forwardRef } = React;

export /*bundle*/ const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref: Ref<HTMLElement>) => {
	const {
		className,
		onClick,
		data,
		label,
		title,
		children,
		icon,
		loading,
		block,
		index,
		fetching = false,
		variant = 'default',
		bordered = false,
		sizing = 'md',
		disabled = false,

		...otherProps
	} = props;

	const context = React.useContext(ButtonGroupContext);

	const [processing, setProcessing] = React.useState(fetching || loading);
	const refObject = React.useRef<HTMLButtonElement>(null);
	const combinedRef = (instance: HTMLButtonElement) => {
		refObject.current = instance;
		if (typeof ref === 'function') ref(instance);
		//@ts-ignore
		else if (ref) ref.current = instance;
	};
	const usingContext = typeof context?.setSelected === 'function';
	const onClickButton = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		if (usingContext) {
			context.setSelected(index);
		}
		if (onClick && typeof onClick === 'function') {
			setProcessing(true);
			//@ts-ignore
			await onClick(event);
			setProcessing(false);
			return;
		}
	};

	React.useEffect(() => {
		const ripple = new RippleEffect();
		ripple.addRippleEffect(refObject.current);

		if (title) {
			tippy(refObject.current);
		}
	}, [title]);

	const properties: IButtonProps = {
		...otherProps,
		type: props.type ? props.type : 'button',
	};
	if (title) properties['data-tippy-content'] = title;
	if (data) {
		Object.keys(data).forEach((entry: string) => {
			properties[`data-${entry}`] = data[entry];
		});
	}

	let cls = `pui-button btn-${variant}`;
	cls += className ? ` ${className}` : '';
	cls += bordered ? ' outline' : '';
	cls += icon ? ' has-icon' : '';
	cls += block ? ' btn--block' : '';
	cls += sizing ? ` btn--${sizing}` : '';
	cls += loading || fetching || processing ? ' btn--loading' : '';
	const clsLoading = `button-label ${loading || processing ? 'button-label--loading' : ''}`;

	if (usingContext && context.selected === index) cls += ' pui-btn--active';
	if (usingContext) properties['data-index'] = index;

	return (
		<button
			ref={combinedRef}
			className={cls}
			onClick={onClickButton}
			disabled={loading || disabled || processing}
			{...properties}
		>
			{icon && <Icon icon={icon} />}
			{label || (children && <div className={clsLoading}>{label || children}</div>)}

			{(loading || fetching || processing) && <Spinner type={`on-${variant}`} active={true} />}
		</button>
	);
});
