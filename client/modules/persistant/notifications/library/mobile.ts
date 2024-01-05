/**
 * Class representing a Mobile device for handling notifications.
 */

export class Mobile {
	/** Device token for push notifications. */
	tokenDevice: string = '';
	/** Specifications for the mobile device. */
	specs: any;
	/** Type of the device - Android or iOS. */
	device: string = '';

	get token() {
		return this.tokenDevice;
	}

	/**
	 * Initializes the Mobile instance with necessary configurations.
	 * @param {any} parent - The parent object.
	 * @param {any} params - The parameters for initialization.
	 */
	init = (parent: any, params?: any) => {
		if (!globalThis?.FirebasePlugin) return;
		this.specs = Object.assign({}, { userId: params.userId, appKey: params.appKey });

		const userAgent = navigator.userAgent;
		if (/android|windows phone/i.test(userAgent) || userAgent.match(/BlackBerry|BB|PlayBook/i)) {
			this.device = 'Android';
		}
		if (/iPad Simulator|iPhone Simulator|iPod Simulator|iPad|iPhone|iPod/i.test(userAgent)) {
			this.device = 'iOS';
		}
		globalThis.FirebasePlugin.onTokenRefresh(
			(token: string) => this.register(parent, token),
			error => this.processError('onTokenRefresh error: ', error)
		);

		globalThis.FirebasePlugin.registerAuthStateChangeListener(userSignedIn =>
			console.log('Auth state changed: User signed ' + (userSignedIn ? 'in' : 'out'))
		);

		if ((this.device = 'Android' && globalThis?.cordova?.plugin?.customfcmreceiver)) {
			// Custom FCM receiver plugin
			globalThis.cordova.plugin.customfcmreceiver.registerReceiver(message =>
				console.log('Received custom message: ', message)
			);
		}

		//Register handlers
		globalThis.FirebasePlugin.onMessageReceived(parent.onMessagePreHandler, parent.onMessageError);

		this.checkNotificationPermission(false);
		this.isAutoEnabled();
		this.isUserSigned();
		if (this.device === 'iOS') this.initIos();
	};

	/**
	 * Logs errors to the console.
	 * @param {string} target - The target of the error.
	 * @param {Error} error - The error object.
	 */
	processError(target, error) {
		console.error(target, error);
	}

	renewToken = async () => {
		return { status: true };
	};

	/**
	 * Registers the device with the parent object.
	 * @param {any} parent - The parent object.
	 * @param {string} token - The device token.
	 */
	register(parent, token) {
		if (this.tokenDevice && token === this.tokenDevice) return;
		this.tokenDevice = token;
		this.specs.tokenDevice = this.tokenDevice;
		this.specs.device = this.device;
		return parent.onRegisterDevice({ device: this.device, tokenDevice: this.tokenDevice });
	}

	/**
	 * Gets the device token from FirebasePlugin.
	 * @param {any} parent - The parent object.
	 */
	getToken(parent) {
		globalThis.FirebasePlugin.getToken(
			(token: string) => this.register(parent, token),
			error => this.processError('getToken error: ', error)
		);
	}

	/** Checks if auto-init is enabled in FirebasePlugin. */
	isAutoEnabled() {
		globalThis.FirebasePlugin.isAutoInitEnabled(
			(enabled: boolean) => error => this.processError('Failed to check auto init', error)
		);
	}

	/** Checks if a user is signed in with FirebasePlugin. */
	isUserSigned() {
		globalThis.FirebasePlugin.isUserSignedIn(
			(isSignedIn: string) => error => this.processError('Failed to check if user is signed in', error)
		);
	}

	/** Initializes iOS specific configurations. */
	initIos() {
		globalThis.FirebasePlugin.onApnsTokenReceived(error =>
			this.processError('Failed to receive APNS token', error)
		);

		globalThis.FirebasePlugin.registerInstallationIdChangeListener((installationId: string | number) =>
			console.log('Installation ID changed - new ID: ' + installationId)
		);
	}

	/**
	 * Checks for notification permissions and requests if not already granted.
	 * @param {boolean} requested - Whether permission has been requested before.
	 */
	checkNotificationPermission(requested) {
		globalThis.FirebasePlugin.hasPermission(
			(hasPermission: boolean | string) => {
				if (hasPermission) this.getToken(parent);
				else if (!requested)
					globalThis.FirebasePlugin.grantPermission(this.checkNotificationPermission.bind(this, true));
				else this.processError("Notifications won't be shown as permission is denied", undefined);
			},
			error => this.processError('has permission error: ', error)
		);
	}
}
