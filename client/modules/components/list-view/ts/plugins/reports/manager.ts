import type { StoreListView } from '../../store-prototype';

export class Reports {
	#parent: StoreListView;
	toExpose: string[] = ['bulkRemove', 'import', 'getTemplate', 'generateReport'];

	constructor(parent: StoreListView) {
		this.#parent = parent;
	}

	bulkRemove = async () => {
		try {
			this.#parent.fetching = true;

			this.#parent.selectedItems.forEach(async (item) => {
				const response = await item.delete();
				if (!response) throw 'RECORD_COULDNT_BE_REMOVED';
			});

			await this.#parent.load();
			this.#parent.selectedItems = new Map();
			await this.#parent.clearSearch();
			return { status: true };
		} catch (error) {
			console.error(error);
			return { status: false, error };
		} finally {
			this.#parent.fetching = false;
		}
	};

	import = async (file: File) => {
		try {
			this.#parent.fetching = true;
			const response = await this.#parent.collection.import({ file });
			if (!response.status) throw response.error;
			await this.#parent.load();
			return response;
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.#parent.fetching = false;
		}
	};

	getTemplate = async ({ type }: { type: 'xlsx' | 'csv' }) => {
		try {
			this.#parent.fetching = true;
			const response = await this.#parent.collection.getTemplate({ type });

			const a = document.createElement('a');
			a.href = response.data;
			const nameType = type === 'xlsx' ? 'Excel' : 'CSV';
			a.download = `%${nameType}-Template.${type}`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(response.data);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.#parent.fetching = false;
		}
	};

	generateReport = async ({ header, type }: { header: { label: string; name: string }[]; type: 'xlsx' | 'csv' }) => {
		try {
			this.#parent.fetching = true;
			const response = await this.#parent.collection.generateReport({
				header,
				params: this.#parent.params,
				type,
			});

			const date = new Date();
			const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '-');

			const a = document.createElement('a');
			a.href = response.data;
			a.download = `Report-${formattedDate}.${type}`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(response.data);
		} catch (error) {
			console.error(error);
			return error;
		} finally {
			this.#parent.fetching = false;
		}
	};
}
