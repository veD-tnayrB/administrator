import React from 'react';
import {Switch} from 'pragmate-ui/form';
import {Icon} from 'pragmate-ui/icons';

export /*bundle*/ function ThemeSwitcher(): JSX.Element {
	const theme = globalThis?.matchMedia('(prefers-color-scheme: dark)').matches;
	const themeStorage = localStorage.getItem('theme');
	const defaultTheme: string = theme ? 'dark' : 'light';
	const userTheme: boolean = themeStorage ? themeStorage === 'dark' : defaultTheme === 'dark';
	const [isDark, setIsDark] = React.useState<boolean>(userTheme);

	function handleChange({target}): void {
		const container = document.querySelector('html');
		const theme = isDark ? 'light' : 'dark';
		container.setAttribute('data-beyond-mode', theme);
		localStorage.setItem('theme', theme);
		setIsDark(target.checked);
	}

	React.useEffect(() => {
		if (!themeStorage) return;
		const container = document.querySelector('html');
		container.setAttribute('data-beyond-mode', themeStorage);
	}, []);

	const icon: string = isDark ? 'moon' : 'sun';
	return (
		<div className="theme">
			<div className="container-theme">
				<Icon icon={icon} />
				<Switch className="checkbox" checked={isDark} onChange={handleChange} />
			</div>
		</div>
	);
}
