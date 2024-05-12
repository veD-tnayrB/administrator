import React from 'react';
import { Input, Textarea } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';
import { useModulesManagmentContext } from '../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import type { IModule, IAction } from '@essential-js/admin/models';

export const ActionManagment = () => {
	const { store, setItem, item } = useModulesManagmentContext();
	const [selectedAction, setSelectedAction] = React.useState(store.selectedAction);
	useBinder([store], () => setSelectedAction(store.selectedAction));
	if (!selectedAction) return null;

	const add = () => {
		const isAnExistingItem = !store.selectedAction?.isCreating

		if (!isAnExistingItem) {
			setItem((currentValue: IModule) => ({ ...currentValue, actions: [store.selectedAction, ...currentValue.actions] }))

			store.selectedAction = null
			return
		}

		setItem((currentValue: IModule) => {
			const actions = currentValue.actions.map((action: IAction) => {
				if (action.id === store.selectedAction.id) return store.selectedAction

				return action
			})

			return {
				...currentValue,
				actions
			}
		})

		store.selectedAction = null
	}

	const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		const item = { ...store.selectedAction };
		item[name] = name === 'name' ? value.toLowerCase() : value;
		store.selectedAction = item;
	}

	const isInputNameDisabled = !store.selectedAction?.isCreating
	const actionLabel = store.selectedAction?.isCreating ? 'Add' : 'Edit'
	return (

		<section className="flex flex-col gap-4">
			<Input placeholder="profiles.create" name="name" onChange={onChange} disabled={isInputNameDisabled} value={selectedAction.name} />
			<Textarea placeholder="Allow the user go to the profiles creatin module" onChange={onChange} value={selectedAction.description} name="description" />
			<Button onClick={add} variant="primary">{actionLabel}</Button>
		</section>


	)
} 
