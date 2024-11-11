import config from '@essential-js/admin/config';
let swLocation = config.params.application.swLocation;

if (navigator.serviceWorker) {
	navigator.serviceWorker.register(swLocation);
}
