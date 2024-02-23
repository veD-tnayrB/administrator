import React from 'react';
import { useListViewContext } from '../../../../../context';
import { Button } from 'pragmate-ui/components';
import { Dialog } from '@essential-js/admin/components/dialog';

export const DownloadTemplate = () => {
	const { store } = useListViewContext();

	const onExcel = () => store.getTemplate({ type: 'xlsx' });
	const onCSV = () => store.getTemplate({ type: 'csv' });

	const options = {
		toggler: {
			children: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-download">
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="7 10 12 15 17 10" />
					<line x1="12" x2="12" y1="15" y2="3" />
				</svg>
			),
			className: 'generate-report',
			title: 'Download Template',
		},
	};

	return (
		<Dialog variant="secondary" {...options}>
			<ul>
				<li>
					<Button onClick={onExcel} className="generate-report-option">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="100"
							height="100"
							viewBox="0 0 24 24">
							<path d="M 14 3 L 2 5 L 2 19 L 14 21 L 14 19 L 21 19 C 21.552 19 22 18.552 22 18 L 22 6 C 22 5.448 21.552 5 21 5 L 14 5 L 14 3 z M 12 5.3613281 L 12 18.638672 L 4 17.306641 L 4 6.6933594 L 12 5.3613281 z M 14 7 L 16 7 L 16 9 L 14 9 L 14 7 z M 18 7 L 20 7 L 20 9 L 18 9 L 18 7 z M 5.1757812 8.296875 L 7.0605469 11.994141 L 5 15.703125 L 6.7363281 15.703125 L 7.859375 13.308594 C 7.934375 13.079594 7.9847656 12.908922 8.0097656 12.794922 L 8.0253906 12.794922 C 8.0663906 13.032922 8.1162031 13.202109 8.1582031 13.287109 L 9.2714844 15.701172 L 11 15.701172 L 9.0058594 11.966797 L 10.943359 8.296875 L 9.3222656 8.296875 L 8.2929688 10.494141 C 8.1929688 10.779141 8.1257969 10.998625 8.0917969 11.140625 L 8.0664062 11.140625 C 8.0084063 10.902625 7.9509531 10.692719 7.8769531 10.511719 L 6.953125 8.296875 L 5.1757812 8.296875 z M 14 11 L 16 11 L 16 13 L 14 13 L 14 11 z M 18 11 L 20 11 L 20 13 L 18 13 L 18 11 z M 14 15 L 16 15 L 16 17 L 14 17 L 14 15 z M 18 15 L 20 15 L 20 17 L 18 17 L 18 15 z"></path>
						</svg>
						Excel
					</Button>
				</li>

				<li>
					<Button onClick={onCSV} className="generate-report-option">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							className="bi bi-filetype-csv"
							viewBox="0 0 16 16">
							<path
								fillRule="evenodd"
								d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.517 14.841a1.13 1.13 0 0 0 .401.823q.195.162.478.252.284.091.665.091.507 0 .859-.158.354-.158.539-.44.187-.284.187-.656 0-.336-.134-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.566-.21l-.621-.144a1 1 0 0 1-.404-.176.37.37 0 0 1-.144-.299q0-.234.185-.384.188-.152.512-.152.214 0 .37.068a.6.6 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.2-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.439 0-.776.15-.337.149-.527.421-.19.273-.19.639 0 .302.122.524.124.223.352.367.228.143.539.213l.618.144q.31.073.463.193a.39.39 0 0 1 .152.326.5.5 0 0 1-.085.29.56.56 0 0 1-.255.193q-.167.07-.413.07-.175 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384zM.806 13.693q0-.373.102-.633a.87.87 0 0 1 .302-.399.8.8 0 0 1 .475-.137q.225 0 .398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.4 1.4 0 0 0-.489-.272 1.8 1.8 0 0 0-.606-.097q-.534 0-.911.223-.375.222-.572.632-.195.41-.196.979v.498q0 .568.193.976.197.407.572.626.375.217.914.217.439 0 .785-.164t.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.8.8 0 0 1-.118.363.7.7 0 0 1-.272.25.9.9 0 0 1-.401.087.85.85 0 0 1-.478-.132.83.83 0 0 1-.299-.392 1.7 1.7 0 0 1-.102-.627zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879z"
							/>
						</svg>
						CSV
					</Button>
				</li>
			</ul>
		</Dialog>
	);
};
