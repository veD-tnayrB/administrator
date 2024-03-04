import React from 'react';

export function TextareaError({ state, hasError, errorMessage, value }) {
	if (!state._hasError && !hasError) return null;

	if (hasError || value !== '') errorMessage = errorMessage ? errorMessage : state.errorMessage;

	return <span className='pui-element-input-error'>{errorMessage}</span>;
}
