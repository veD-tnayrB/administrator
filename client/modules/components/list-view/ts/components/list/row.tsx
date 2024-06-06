import React from 'react';
import { v4 as uuid } from 'uuid';
import { useListViewContext } from '../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Button } from 'pragmate-ui/components';
import { DeleteModal } from './pre-done-actions/delete';
import { routing } from '@beyond-js/kernel/routing';
import { Checkbox } from 'pragmate-ui/form';

const getValue = (obj: Record<string, string | number>, prop: string): string | number => {
	let currentObj: Record<string, string | number> | undefined | null = obj;
	const props = prop.split('.');

	for (const p of props) {
		if (currentObj === null || typeof currentObj !== 'object') {
			return '';
		}
		currentObj = currentObj[p] as unknown as Record<string, string | number> | undefined;
	}

	return currentObj as unknown as string | number;
};

export /*bundle*/ interface IRow {
	item: Record<string, any>;
	index: number;
	propertiesToDisplay: string[];
	selectedItems?: Map<string, Record<string, any>>;
}

export const DefaultRow = ({ index, item, propertiesToDisplay, selectedItems }: IRow) => {
	const { list, store } = useListViewContext();
	const [, setUpdate] = React.useState({});
	const [displayDeleteModal, setDisplayModal] = React.useState(false);
	useBinder([store], () => setUpdate({}), ['displaying-change']);
	useBinder([item], () => setUpdate({}));

	const output = propertiesToDisplay.map((property) => {
		let value = getValue(item, property);
		if (property === 'timeCreated' || property === 'timeUpdated') {
			value = new Date(value).toLocaleString().split(',')[0];
		}
		return (
			<span className="field" key={uuid()}>
				{value}
			</span>
		);
	});

	const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setDisplayModal(true);
	};
	const onCloseDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setDisplayModal(false);
	};

	const includesEdit = list.itemsConfig?.actions?.find((item) => item.type === 'edit');
	const includesDelete = list.itemsConfig?.actions?.find((item) => item.type === 'delete');
	const displayActions = includesEdit || includesDelete;

	const onClickEdit = () => routing.pushState(`${includesEdit?.to}/${item.id}`);
	const onSelect = () => {
		if (list.isSelecteable) store.selectItem({ id: item.id });
	};

	const includeCheck = list.isSelecteable;
	const isItemSelected = selectedItems?.has(item.id);
	const selectableCls = list.isSelecteable ? 'selectable' : '';

	return (
		<li className={`row default-row ${selectableCls}`} onClick={onSelect}>
			{includeCheck && (
				<span className="check-item field">
					<Checkbox tabIndex={index} checked={isItemSelected} onChange={onSelect} id={item.id} />
				</span>
			)}

			{output}
			{displayActions && (
				<span className="actions-container field">
					<div className="row-actions">
						{includesEdit && (
							<Button onClick={onClickEdit} title={includesEdit.title}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									stroke="currentColor"
									className="lucide lucide-pen-line icon"
								>
									<path d="M12 20h9" />
									<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
								</svg>
							</Button>
						)}
						{includesDelete && (
							<Button onClick={onClickDelete} title={includesDelete.title}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									stroke="currentColor"
									className="lucide lucide-trash-2 icon"
								>
									<path d="M3 6h18" />
									<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
									<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
									<line x1="10" x2="10" y1="11" y2="17" />
									<line x1="14" x2="14" y1="11" y2="17" />
								</svg>
							</Button>
						)}
					</div>
				</span>
			)}

			{displayDeleteModal && includesDelete && (
				<DeleteModal onClose={onCloseDelete} config={includesDelete} id={item.id} />
			)}
		</li>
	);
};
