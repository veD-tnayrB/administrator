export class StyleObserver {
	private observer: MutationObserver;

	constructor({ callback }: { callback: Function }) {
		this.observer = new MutationObserver(mutations => {
			mutations.forEach((mutation: MutationRecord) => {
				if (mutation.type !== 'childList') return
				callback(mutation.addedNodes);
			});
		});
	}

	startObserving(targetNode: HTMLElement): void {
		if (!targetNode) return;
		const config = { childList: true };
		this.observer.observe(targetNode, config);
	}

	stopObserving(): void {
		this.observer.disconnect();
	}
}
