import * as React from 'react';
import { session } from '@essential-js/admin/auth';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { useTexts } from '@essential-js/admin/helpers';
import { module } from 'beyond_context';
import { StoreManager } from '../store';
import { Row } from './table/row';
import { ITexts } from './types';
import { Button } from 'pragmate-ui/components';

export const head = [
	{ label: 'Nombre', id: 'profile' },
	{ label: 'Descripcion', id: 'description' },
];

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts<ITexts>(module.specifier);
	const [update, setUpdate] = React.useState({});
	useBinder([store], () => {
		setUpdate({});
	});

	if (!ready) return null;

	const output = store.collection.items.map(item => <Row key={item.id} item={item} />);

	return (
		<div className="">
			<Button>{texts.create}</Button>

			{output}
		</div>
	);
}
