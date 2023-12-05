import * as React from 'react';
import { StoreManager } from '../store';
import { IContext, UsersListContext } from '../context';
import { module } from 'beyond_context';
import { useTexts } from '@essential-js/admin/helpers';
import { Button } from 'pragmate-ui/components';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export /*bundle*/
function View({ store }: { store: StoreManager }) {
	const [ready, texts] = useTexts(module.specifier);
	const [update, setUpdate] = React.useState({});

	useBinder([store], () => setUpdate({}));

	if (!ready) return null;
	const contextValue: IContext = {
		store,
		texts,
	};

	const output = store.collection.items.map(item => <li key={item.id}>{item.fullName}</li>);
	console.log(store.collection.items);
	return (
		<UsersListContext.Provider value={contextValue}>
			<div>
				<Button>{texts.create}</Button>
				<ul>{output}</ul>
			</div>
		</UsersListContext.Provider>
	);
}
