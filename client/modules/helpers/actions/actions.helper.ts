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
import { IDataParams, IPublishParams } from './types/item.types';

type IModel = CollectionReference<DocumentData, DocumentData>;

export /*bundle*/ class Actions {
	static list = async (model: IModel, params: IListParams) => {
		try {
			const limitNumber = params?.limit || 10;
			const startNumber = params?.start || 0;
			const order = params?.order || { by: 'timeUpdated', way: 'asc' };
			const search = params?.where || {};

			let buildedQuery = query(model, orderBy(order.by, order.way), limit(limitNumber));
			let totalQuery = query(model, orderBy(order.by, order.way)); // Query without limit for total count

			for (const field in search) {
				if (search[field]) {
					buildedQuery = query(
						buildedQuery,
						where(field, '>=', search[field]),
						where(field, '<', search[field] + '\uf8ff')
					);
					totalQuery = query(
						totalQuery,
						where(field, '>=', search[field]),
						where(field, '<', search[field] + '\uf8ff')
					);
				}
			}

			const allDocs = await getDocs(totalQuery);
			const startDoc = allDocs.docs[startNumber];

			buildedQuery = query(buildedQuery, startAt(startDoc));

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
					total: allDocs.size,
				},
			};
		} catch (error) {
			return {
				status: false,
				error,
			};
		}
	};

	static publish = async (model: IModel, params: IPublishParams) => {
		try {
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

	static data = async (model: IModel, params: IDataParams) => {
		try {
			let buildedQuery = query(model);

			for (const field in params) {
				if (params[field]) {
					buildedQuery = query(buildedQuery, where(field, '==', params[field]));
				}
			}

			const querySnapshot = await getDocs(buildedQuery);
			let item = querySnapshot.docs.length ? querySnapshot.docs[0].data() : null;

			if (!item) throw 'Item not found';
			return {
				status: true,
				data: item,
			};
		} catch (error) {
			return { status: false, error };
		}
	};
}
