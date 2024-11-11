import { ReactiveModel } from '@beyond-js/reactive/model';

export /*bundle*/ type ToastTypes = 'success' | 'error' | 'info' | 'loading' | 'warning';
export /*bundle*/ interface IToast {
	id: string;
	message: string;
	type: ToastTypes;
	duration?: number;
}

class Toast extends ReactiveModel<any> {
	#current: Array<IToast | undefined>;

	get current() {
		return this.#current;
	}

	set current(newValue: Array<IToast | undefined>) {
		this.#current = newValue;
		this.triggerEvent('current.toast.changed');
	}

	constructor() {
		super();
		this.#current = [];
	}
	#generateUniqueId() {
		return crypto.getRandomValues(new Uint8Array(16)).toString();
	}
	#add(type: ToastTypes, message: string, duration: number) {
		const newToast: IToast = {
			id: this.#generateUniqueId(),
			message,
			type,
			duration,
		};

		this.#current = [...this.#current, newToast];
		this.triggerEvent('current.toast.changed');
		return newToast.id;
	}

	remove(toastId: string) {
		this.#current = this.#current.filter((toast: IToast) => toast.id !== toastId);
		this.triggerEvent('current.toast.changed');
	}

	success(message: string, duration?: number) {
		return this.#add('success', message, duration);
	}

	error(message: string, duration?: number) {
		return this.#add('error', message, duration);
	}

	warning(message: string, duration?: number) {
		return this.#add('warning', message, duration);
	}

	info(message: string, duration?: number) {
		return this.#add('info', message, duration);
	}

	loading(message: string, duration?: number) {
		return this.#add('loading', message, duration);
	}
}

export /*bundle*/ const toast = new Toast();
