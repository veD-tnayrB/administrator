export interface ITPane {
	tab: string;
	content: React.ReactNode;
}

export interface ITabProps {
	panes: ITPane[];
	children?: React.ReactNode;
	active?: number;
	setURL?: boolean;
	className?: string;
	onChange?: (event, index) => void;
}
