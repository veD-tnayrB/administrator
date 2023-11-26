import {
	CollectionReference,
	DocumentData,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	setDoc,
	startAt,
	updateDoc,
	where,
} from 'firebase/firestore';
import { IListParams } from './types/collection.types';
import { IPublishParams } from './types/item.types';

type IModel = CollectionReference<DocumentData, DocumentData>;

export /*bundle*/ class Actions {
	static list = async (model: IModel, params: IListParams) => {
		try {
			const limitNumber = params?.limit || 10;
			const startNumber = params?.start || 0;
			const order = params?.order || { by: 'timeUpdated', way: 'asc' };
			const search = params?.where || {};

			let buildedQuery = query(model, orderBy(order.by, order.way), startAt(startNumber), limit(limitNumber));

			for (const field in search) {
				if (search[field]) {
					buildedQuery = query(
						buildedQuery,
						where(field, '>=', search[field]),
						where(field, '<', search[field] + '\uf8ff')
					);
				}
			}

			const querySnapshot = await getDocs(buildedQuery);

			const items = [];
			querySnapshot.forEach(doc => {
				items.push(doc.data());
			});

			return {
				status: true,
				data: {
					entries: items,
					next: startNumber + items.length,
				},
			};
		} catch (error) {
			return { status: false, error };
		}
	};
	static publish = async (model: IModel, params: IPublishParams) => {
		try {
			console.log('PARMAS => ', params);
			const { isNew, ...data } = params;
			data.timeUpdated = new Date();

			if (params.isNew) {
				data.timeCreated = new Date();

				await setDoc(doc(model, data.id), data);
				return { status: true };
			}

			await updateDoc(doc(model, data.id), data);

			return { status: true };
		} catch (error) {
			return { status: false, error };
		}
	};
}
