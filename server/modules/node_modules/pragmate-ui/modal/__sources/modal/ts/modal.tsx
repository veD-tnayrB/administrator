import * as React from 'react';
import { useState, useRef, MutableRefObject, SyntheticEvent, ReactNode } from 'react';
import { Children } from './children';

type props = {
	children: ReactNode;
	className?: string;
	onClose?: (e: SyntheticEvent<HTMLElement, Event>) => void;
	show?: boolean;
};
export /*bundle*/
	function Modal(props: props) {
	type state = {
		container?: HTMLDivElement;
		show: boolean;
		closeClicked: boolean;
	};
	const [state, setState] = useState<state>({
		show: props?.show ?? false,
		closeClicked: false,
		container: null,
	});
	const modal: MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

	const close = async (event: SyntheticEvent<HTMLElement, Event>): Promise<void> => {
		if (event) event.stopPropagation();

		const body: HTMLBodyElement = document.querySelector('body');
		modal.current.classList.add('modal-hidden');
		window.setTimeout(async (): Promise<void> => {
			setState({ ...state, show: false, closeClicked: true });
			body.setAttribute('style', '');
			body.classList.remove('body-custom-modal-opened');
			const { onClose } = props;
			if (!onClose || typeof onClose !== "function") return;
			onClose(event)
		}, 300);
	};

	const onClickBackdrop = (event: SyntheticEvent<HTMLElement, Event>): void => {
		event.stopPropagation();
		close(event);
	};

	const show: boolean = state.show;

	let cls: string = 'pui-modal ';
	cls += props.className ? props.className : '';

	if (show) cls += ' show-modal';
	const output = [];

	if (show) {
		output.push(
			<div key="modal-content-wrapper" className="modal-wrapper">
				<div
					className="modal-content"
					onClick={event => {
						event.stopPropagation();
					}}
				>
					<Children {...props} close={close} key="children-content" />
				</div>
			</div>
		);
	}

	return (
		<div ref={modal} onClick={onClickBackdrop} className={cls}>
			{output}
		</div>
	);
}
