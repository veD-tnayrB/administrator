const NETWORK_CACHE = 'network';
const ASSETS_CACHE = 'assets';
const assets = [
	'/',
	'/assets',
	'/assets/auth/illustration-0.svg',
	'/assets/auth/illustration-1.svg',
	'/assets/auth/illustration-2.svg',
	'/assets/auth/illustration-3.svg',
	'/assets/spinner/essential/logo-dark.svg',
	'/assets/spinner/essential/logo-light.svg',
	'/assets/spinner/logo-light.svg',
	'/assets/spinner/logo-dark.svg',

	'/assets/sidebar/essential/logo-dark.svg',
	'/assets/sidebar/essential/logo-light.svg',
	'/assets/sidebar/logo-light.svg',
	'/assets/sidebar/logo-dark.svg',
	'/assets/logo.png',
];

self.addEventListener('install', event => {
	event.waitUntil(caches.open(ASSETS_CACHE).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', event => {
	event.respondWith(
		fetch(event.request)
			.then(response => {
				const responseClone = response.clone();
				caches.open(NETWORK_CACHE).then(cache => {
					if (event.request.method === 'GET') {
						cache.put(event.request, responseClone);
					}
				});
				return response;
			})
			.catch(() => {
				// If network request fails, try to serve from cache
				return caches.match(event.request);
			})
	);
});
