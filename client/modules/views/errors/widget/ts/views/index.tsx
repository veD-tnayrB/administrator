import * as React from 'react';
import { StoreManager } from '../store';
import { useTexts } from '@essential-js/admin/helpers';
import { module } from 'beyond_context';
import { ITexts } from '../types';
import { Container } from './container';
import { SpinnerPage } from '@essential-js/admin/components/spinner';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts<ITexts>(module.specifier);

	if (!ready) return <SpinnerPage />;
	const content = store.type ? texts[store.type] : texts['404'];

	return (
		<div className="error-view">
			<Container title={content.title} description={content.description} goBack={texts.goBack} />
		</div>
	);
}
