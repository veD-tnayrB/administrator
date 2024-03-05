import { local } from '@beyond-js/local/main';
import config from '@essential-js/admin/config';

if (config.params.environment === 'development') {
	(async () => {
		try {
			const launchers = ['@essential-js/admin-server'];
			const instances = launchers.map(launcher => local.launchers.get(launcher));
			const promises = instances.map(instance => instance.status);
			const results = await Promise.all(promises);
			results.forEach((result, index) => {
				if (result !== 'running') instances[index].start();
			});
		} catch (error) {
			console.error(error);
		}
	})();
}
