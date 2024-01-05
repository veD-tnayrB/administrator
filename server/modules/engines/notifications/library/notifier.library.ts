import * as admin from 'firebase-admin';
import { Send } from './logic/send';
import { Subscriptions } from './logic/suscription';

interface ICredentials {
	type: string;
	project_id: string;
	private_key_id: string;
	private_key: string;
	client_email: string;
	client_id: string;
	auth_uri: string;
	token_uri: string;
	auth_provider_x509_cert_url: string;
	client_x509_cert_url: string;
	universe_domain: string;
}

/**
 * Class representing a bridge for managing notifications.
 */
export /*bundle*/ class NotifierBridge {
	#app: admin.app.App;
	get app() {
		return this.#app;
	}

	constructor(credentials: ICredentials) {
		this.#app = admin.initializeApp({ credential: admin.credential.cert(credentials as admin.ServiceAccount) });
	}

	/**
	 * Sends a message using provided credentials.
	 * @param {Object} message - The message to be sent.
	 * @returns {Promise} - The result of the Send.execute function.
	 */
	async send(message) {
		return Send.execute(message);
	}

	/**
	 * Subscribes a list of tokens to a specified topic.
	 * @param {string[]} tokens - An array of tokens to be subscribed.
	 * @param {string} topic - The topic to which tokens should be subscribed.
	 * @returns {Promise} - The result of the Suscriptions.subscribe function.
	 */
	async suscribeToTopic(tokens: string[], topic: string) {
		return Subscriptions.subscribe(tokens, topic);
	}
	/**
	 * Unsubscribes a list of tokens to a specified topic.
	 * @param {string[]} tokens - An array of tokens to be subscribed.
	 * @param {string} topic - The topic to which tokens should be subscribed.
	 * @returns {Promise} - The result of the Suscriptions.subscribe function.
	 */
	async unsuscribeToTopic(tokens: string[], topic: string) {
		return Subscriptions.unsubscribe(tokens, topic);
	}
}
