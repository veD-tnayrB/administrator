import React from 'react';

export function useScroll(tabRef: React.RefObject<HTMLDivElement>, activeTab: number) {
	React.useEffect(() => {
		const scrollToTab = (index: number) => {
			const tabElement = tabRef.current?.querySelectorAll('.tab')[index] as HTMLDivElement;
			if (tabElement) {
				const container = tabRef.current as HTMLDivElement;
				const containerRect = container.getBoundingClientRect();
				const tabRect = tabElement.getBoundingClientRect();
				const scrollLeft = container.scrollLeft;

				if (tabRect.left < containerRect.left) {
					container.scrollTo({left: scrollLeft + tabRect.left - containerRect.left, behavior: 'smooth'});
				} else if (tabRect.right > containerRect.right) {
					container.scrollTo({left: scrollLeft + tabRect.right - containerRect.right, behavior: 'smooth'});
				}
			}
		};
		scrollToTab(activeTab);
	}, [activeTab]);
}
