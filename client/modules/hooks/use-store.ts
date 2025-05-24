import React from 'react';

export interface IReactiveStore {
	on(event: string, handler: () => void): void;
	off(event: string, handler: () => void): void;
}

/**
 * A generic React hook that subscribes to a reactive store.
 * The store must implement `.on(event, handler)` and `.off(event, handler)`
 * to manage subscriptions, and emit events to trigger re-renders.
 * @param store The reactive store to subscribe to
 * @param events Array of event names to subscribe to. Defaults to ['change']
 */
export /*bundle*/ function useStore<T extends IReactiveStore>(
	store: T,
	events: string[] = ['change']
): T {
	if (!Array.isArray(events)) {
		throw new Error('The events parameter must be an array of strings');
	}
	// We use a local counter to force re-render whenever the store emits any of the subscribed events.
	const [, setVersion] = React.useState(0);

	React.useEffect(() => {
		const handler = () => {
			setVersion(v => v + 1);
		};

		// Subscribe to all specified events
		events.forEach(event => {
			store.on(event, handler);
		});

		// Cleanup: unsubscribe from all events
		return () => {
			events.forEach(event => {
				store.off(event, handler);
			});
		};
	}, [store, events]);

	// Return the store directly so components can read from it.
	return store;
}
