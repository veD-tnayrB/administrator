import { routing } from '@beyond-js/kernel/routing';
import { Api as BaseApi } from '@bgroup/http-suite/api';
import { session } from '@essential-js/admin/auth';
import config from '@essential-js/admin/config';

export /*bundle*/ class Api extends BaseApi {
	#tokenErrorMessage: string[] = ['TOKEN_EXPIRED', 'INCORRECT_TOKEN'];
	constructor(url?: string) {
		const toUseUrl = url || config.params.server;
		super(toUseUrl);

		this.bearer(session.token);
		session.on('token-changed', () => this.bearer(session.token));
	}

	private async handleSpecificError(response: { status: false; error: string }): Promise<void> {
		if (!this.#tokenErrorMessage.includes(response.error)) return;
		await session.logout();
		routing.pushState('/auth/login');
	}

	// Método para manejar la respuesta y llamar a handleSpecificError si es necesario
	private handleResponse(response: { status: boolean; error?: string; data: Record<string, unknown> }): void {
		if (!response || typeof response !== 'object' || !response.error) return;
		this.handleSpecificError(response as { status: false; error: string });
	}

	// Sobrescribir los métodos específicos para manejar la respuesta de manera centralizada
	async get(
		url: string,
		params,
		header = {
			'Content-Type': 'application/json',
		}
	): Promise<any> {
		try {
			const response = await super.get(url, params, header);
			this.handleResponse(response);
			return response;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	}

	async post(
		url: string,
		data?: object,
		header = {
			'Content-Type': 'application/json',
		}
	): Promise<any> {
		try {
			const response = await super.post(url, data || {}, header);
			this.handleResponse(response);
			return response;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	}

	async put(
		url: string,
		data?: object,
		header = {
			'Content-Type': 'application/json',
		}
	): Promise<any> {
		try {
			const response = await super.put(url, data || {}, header);
			this.handleResponse(response);
			return response;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	}

	async delete(url: string, data?: object): Promise<any> {
		try {
			const response = await super.delete(url, data);
			this.handleResponse(response);
			return response;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	}

	async stream(url: string): Promise<any> {
		try {
			const response = await super.stream(url);
			this.handleResponse(response);
			return response;
		} catch (error) {
			console.error('Error:', error);
			throw error;
		}
	}
}
