import React from 'react';
import { IToast, ToastTypes, toast } from './model';
import { Icon } from 'pragmate-ui/icons';
interface Props {
	key: string;
	type: ToastTypes;
	message: string;
	duration?: number;
	id: string;
}

const DEFAULT_DURATION = 3000;
const ANIMATION_MARGIN = 300;

export /*bundle*/ function Toast({ type, message, duration, id }: Props): JSX.Element {
	const toastRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (toastRef.current) {
			toastRef.current.classList.add('enter');
		}
		return () => {
			if (toastRef.current) toastRef.current.classList.remove('enter');
		};
	}, [toastRef.current]);

	React.useEffect(() => {
		duration = duration ?? DEFAULT_DURATION;

		setTimeout(() => {
			toastRef.current.classList.remove('enter');
			toastRef.current.classList.add('exit');
		}, duration);

		const timeout = setTimeout(() => {
			toast.current = toast.current.filter((item: IToast) => item.id !== id);
		}, duration + ANIMATION_MARGIN);

		return () => clearTimeout(timeout);
	}, [duration, id]);
	const icons = {
		error: 'triangle-exclamation',
		success: 'tickCircle',
		info: 'infoCircle',
		loading: 'refreshCircle',
		warning: 'warning',
	};
	return (
		<article ref={toastRef} className={`toast ${type}`}>
			<Icon icon={icons[type]} className='icon' />
			<p className='message'>{message}</p>
		</article>
	);
}
