export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	data?: Record<string, any>;
	label?: React.ReactNode;
	children?: React.ReactNode;
	icon?: string;
	loading?: boolean;
	fetching?: boolean;
	variant?: string;
	bordered?: boolean;
	sizing?: 'sm' | 'md' | 'lg' | 'xs';
	disabled?: boolean;
	block?: boolean;
	index?: number;
	title?: string;
}
