import React, {
	MouseEvent,
	ButtonHTMLAttributes,
	SVGAttributes,
	RefAttributes,
	forwardRef,
	PropsWithChildren,
	LegacyRef,
} from 'react';
import tippy from 'tippy.js';
import { routing } from '@beyond-js/kernel/routing';
import { Icon } from './icon';
import { RippleEffect } from 'pragmate-ui/ripple';

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: string;
	viewBox?: SVGAttributes<SVGSVGElement>['viewBox'];
	id?: string;
	title?: string;
	tippy?: string | object;
	navigate?: string;
	variant?: string;
	'data-tippy-content'?: string;
}

interface iconAttributes {
	icon: string | undefined;
	viewBox?: string;
}

export /*bundle*/
	const IconButton: React.FC<PropsWithChildren<props> & RefAttributes<HTMLButtonElement>> = forwardRef(
		(props: PropsWithChildren<props>, ref: LegacyRef<HTMLButtonElement> | undefined): JSX.Element => {
			const { icon, onClick, viewBox, disabled, name, value, id, title, children } = props;

			const buttonRef = React.useRef(null);

			React.useEffect(() => {
				const ripple = new RippleEffect();
				ripple.addRippleEffect(buttonRef.current);

				if (title) {
					tippy(buttonRef.current, {
						content: title,
					});
				}
			}, [title]);

			const onClickButton = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
				if (onClick && typeof onClick === 'function') {
					onClick(event);
					return;
				}

				if (props.navigate) {
					routing.pushState(props.navigate);
				}
			};

			let { className, type, variant = 'default' } = props;
			type = !!type ? type : 'button';
			className = className ? ` pui-icon-button ${className}` : 'pui-icon-button';
			className += variant ? ` btn-${variant}` : '';

			const iconAttributes: iconAttributes = { icon: icon };
			if (viewBox) iconAttributes.viewBox = viewBox;

			const attrs: props = Object.assign({}, props);
			title ? (attrs['data-tippy-content'] = title) : null;

			const attrsToDelete = ['icon', 'type', 'title', 'viewBox', 'className'];

			attrsToDelete.forEach(attr => {
				delete attrs[attr];
			});

			return (
				<button
					id={id}
					type={type}
					ref={buttonRef}
					name={name}
					value={value}
					disabled={disabled}
					className={className}
					onClick={onClickButton}
					{...attrs}
				>
					<Icon {...iconAttributes} />
					{children}
					{/* {!disabled && <BeyondWaves/>} */}
				</button>
			);
		}
	);
