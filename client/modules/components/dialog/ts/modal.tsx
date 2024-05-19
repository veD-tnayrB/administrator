import React from 'react';

export const Modal = ({ children }: { children: React.ReactNode }) => {
	return <article className="modal">{children}</article>;
};
