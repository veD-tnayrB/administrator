export interface IButtonGroupProps {
	variant?: string;
	size?: 'small' | 'medium' | 'tall';
	orientation?: 'row' | 'column';
	children?: React.ReactNode;
	selected?: number;
	disabled?: boolean;
	index?: number;
	sizing?: string;
}
