import { CollectionReference, DocumentData, collection } from 'firebase/firestore';
import { Actions } from '../actions/actions.helper';
import { db } from '@essential-js/admin/init';
import { IPublishParams } from '../actions/types/item.types';

export /*bundle*/ abstract class ItemProvider {
	#model: CollectionReference<DocumentData, DocumentData>;

	constructor(params: { collection: string }) {
		this.#model = collection(db, params.collection);
	}

	publish = async (params: IPublishParams) => {
		return Actions.publish(this.#model, params);
	};
}
