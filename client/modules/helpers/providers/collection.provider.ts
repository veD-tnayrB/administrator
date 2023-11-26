import { CollectionReference, DocumentData, collection } from 'firebase/firestore';
import { Actions } from '../actions/actions.helper';
import { IListParams } from '../actions/types/collection.types';
import { db } from '@essential-js/admin/init';

export /*bundle*/ abstract class CollectionProvider {
	#model: CollectionReference<DocumentData, DocumentData>;

	constructor(params: { collection: string }) {
		this.#model = collection(db, params.collection);
	}

	list = async (params: IListParams) => {
		return Actions.list(this.#model, params);
	};
}
