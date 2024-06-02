import React from 'react';

interface IProps extends React.HTMLProps<HTMLDivElement> {
	onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

export const BaseModal = ({ children, onClose, ...props }: IProps) => {
	const onClickBackdrop = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		onClose(event);
	};

	const onClickContent = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

	return (
		<div onClick={onClickBackdrop} className="modal-background">
			<article onClick={onClickContent} className={`modal-content ${props.className}`}>
				{children}
			</article>
		</div>
	);
};
