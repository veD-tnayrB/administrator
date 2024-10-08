import React from 'react';

export function TextareaCounter({ counter, length, maxlength }) {
	if (!counter) return null;

	let cls = 'pui-textarea-counter';

	if (maxlength && length > maxlength - 15) {
		cls += length > maxlength - 5 ? ' pui-textarea-counter--danger' : ' pui-textarea-counter--warning';
	}
	return <span className={cls}>{length ?? 0}</span>;
}
