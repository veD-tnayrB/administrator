import React from 'react';
import tippy from 'tippy.js';
import {ITippySettings} from './ITippySettings';
interface IProps {
	children: React.ReactNode;
	content: ITippySettings['content'];
	placement?: ITippySettings['placement'];
	settings?: ITippySettings;
}
export /*bundle*/ function Tooltip({children, content, placement = 'top', settings = {}}: IProps) {
	const ref = React.useRef(null);
	const placements: string[] = [
		'top',
		'top-start',
		'top-end',
		'right',
		'right-start',
		'right-end',
		'bottom',
		'bottom-start',
		'bottom-end',
		'left',
		'left-start',
		'left-end',
		'auto',
		'auto-start',
		'auto-end',
	];

	if (!placements.includes(placement)) placement = 'top';
	const specs: ITippySettings = {placement, content};
	React.useEffect(() => {
		tippy(ref.current, specs);
	}, []);

	return (
		<span ref={ref} className="pui-tooltip">
			{children}
		</span>
	);
}
