import { collection, getDocs, limit, orderBy, query, startAt } from 'firebase/firestore';
import { db } from '../../db-setup/firebase';
import { IListParams } from '../types';

export class UsersCollectionProvider {
	#model = collection(db, 'users');

	list = async (params: IListParams) => {
		try {
			const limitNumber = params?.limit || 10;
			const startNumber = params?.start || 0;
			const order = params?.order || { by: 'timeUpdated', way: 'asc' };

			const buildedQuery = query(
				this.#model,
				orderBy(order.by, order.way),
				startAt(startNumber),
				limit(limitNumber)
			);

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
}
