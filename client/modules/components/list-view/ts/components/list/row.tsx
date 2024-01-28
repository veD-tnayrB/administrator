import React from 'react';
import { v4 as uuid } from 'uuid';
import { useListViewContext } from '../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { DeleteModal } from './pre-done-actions/delete';
import { routing } from '@beyond-js/kernel/routing';
import { Checkbox } from 'pragmate-ui/form';

const getValue = (obj: Object, prop: string) => {
	return prop.split('.').reduce((o, p) => (o || {})[p], obj);
};

export /*bundle*/ interface IRow {
	item: Record<string, any>;
	index: number;
	propertiesToDisplay: string[];
	selectedItems?: Map<string, Record<string, any>>;
}

export const DefaultRow = ({ item, propertiesToDisplay, selectedItems }: IRow) => {
	const { list, store } = useListViewContext();
	const [, setUpdate] = React.useState({});
	const [displayDeleteModal, setDisplayModal] = React.useState(false);
	useBinder([store], () => setUpdate({}), 'displaying-change');

	const output = propertiesToDisplay.map(property => {
		const value = getValue(item, property);
		return (
			<span className="field" key={uuid()}>
				{value}
			</span>
		);
	});

	const onClickDelete = () => setDisplayModal(true);
	const onCloseDelete = () => setDisplayModal(false);

	const includesEdit = list.itemsConfig.actions.find(item => item.type === 'edit');
	const includesDelete = list.itemsConfig.actions.find(item => item.type === 'delete');
	const displayActions = includesEdit || includesDelete;

	const onClickEdit = () => routing.pushState(`${includesEdit.to}/${item.id}`);
	const onSelect = () => store.selectItem({ id: item.id });

	const includeCheck = list.isSelecteable;
	const isItemSelected = selectedItems?.has(item.id);

	return (
		<li className="row default-row">
			{includeCheck && (
				<span className="check-item field">
					<Checkbox checked={isItemSelected} onChange={onSelect} id={item.id} />
				</span>
			)}

			{output}
			{displayActions && (
				<span className="actions-container field">
					<div className="row-actions">
						{includesEdit && (
							<Button onClick={onClickEdit} title={includesEdit.title}>
								<svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
										fillRule="evenodd"
										clipRule="evenodd"></path>
								</svg>
							</Button>
						)}
						{includesDelete && (
							<Button onClick={onClickDelete} title={includesDelete.title}>
								<svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
										fillRule="evenodd"
										clipRule="evenodd"></path>
								</svg>
							</Button>
						)}
					</div>
				</span>
			)}

			{displayDeleteModal && <DeleteModal onClose={onCloseDelete} config={includesDelete} id={item.id} />}
		</li>
	);
};
