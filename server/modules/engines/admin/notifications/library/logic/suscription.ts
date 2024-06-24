import { getMessaging } from 'firebase-admin/messaging';

/**
 * Class representing the Subscriptions functionality.
 */
export class Subscriptions {
	/**
	 * Subscribes a list of tokens to a specific topic.
	 * @static
	 * @param {string[]} tokens - The list of tokens to subscribe.
	 * @param {string} topic - The topic to subscribe the tokens to.
	 * @returns {Object} - An object containing the status and data or error information.
	 */
	static subscribe = (tokens: string[], topic: string) => {
		try {
			const response = getMessaging().subscribeToTopic(tokens, topic);
			return { status: true, data: response };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		}
	};

	/**
	 * Unsubscribes a list of tokens from a specific topic.
	 * @static
	 * @param {string[]} tokens - The list of tokens to unsubscribe.
	 * @param {string} topic - The topic to unsubscribe the tokens from.
	 * @returns {Object} - An object containing the status and data or error information.
	 */
	static unsubscribe = (tokens: string[], topic: string) => {
		try {
			// Check if a Firebase app is already initialized, if not initialize a new app
			// if (!admin.apps.length) {
			// 	admin.initializeApp({
			// 		credential: admin.credential.cert(credentials),
			// 	});
			// }

			const response = getMessaging().unsubscribeFromTopic(tokens, topic);
			return { status: true, data: response };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		}
	};
}
