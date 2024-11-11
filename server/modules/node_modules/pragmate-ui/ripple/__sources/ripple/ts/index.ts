export /*bundle*/ class RippleEffect {
	private elements: Element[];

	constructor(elements: Element | Element[] | undefined = undefined) {
		if (elements) this.add(elements);
	}

	private add(elements) {
		this.elements = Array.isArray(elements) ? elements : [elements];
		this.elements.forEach(element => {
			element.classList.add('ripple');
			element.addEventListener('mousedown', this.onClick);
		});
	}

	public addRippleEffect(ref: any) {
		this.add(ref);
	}

	private onClick = (event: MouseEvent) => {
		const rect = (event.target as HTMLElement).getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const ripple = document.createElement('span');
		ripple.style.left = `${x}px`;
		ripple.style.top = `${y}px`;
		(event.target as HTMLElement).appendChild(ripple);
		setTimeout(() => {
			ripple.remove();
		}, 1000);
	};

	public cleanup() {
		this.elements.forEach(element => {
			element.removeEventListener('mousedown', this.onClick);
		});
		this.elements = [];
	}
}
