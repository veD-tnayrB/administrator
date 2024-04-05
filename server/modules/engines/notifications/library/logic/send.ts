import { getMessaging } from 'firebase-admin/messaging';

/**
 * Class representing the Send functionality.
 */
export class Send {
	/**
	 * Executes the sending of a message using Firebase Admin SDK.
	 * @static
	 * @async
	 * @param {Object} message - The message object to be sent.
	 * @returns {Promise<Object>} - A promise that resolves to an object containing either a data property (with the response) or an error property.
	 */
	static execute = async message => {
		try {
			// Send the message using Firebase Admin SDK
			const response = await getMessaging().send(message);
			return { status: true, data: response };
		} catch (error) {
			// Log and return the error if unsuccessful
			console.error(error);
			return { status: false, error };
		}
	};

	static sendMultipleCast = async message => {
		try {
			// Send the message using Firebase Admin SDK
			const response = await getMessaging().sendEachForMulticast(message);
			return { status: true, data: response };
		} catch (error) {
			// Log and return the error if unsuccessful
			console.error(error);
			return { status: false, error };
		}
	};
}
