import React from 'react';
import { Image } from 'pragmate-ui/image';
import { Placeholder } from './placeholder';

interface IProps {
	src: string;
	name: string;
}

export const ProfileImage = ({ name, src }: IProps) => {
	const isUrl = /^(http|https):\/\/[^ "]+$/.test(src);

	const formatedSrc = React.useMemo(() => {
		if (isUrl) {
			return src;
		}
		return `data:image/png;base64,${src}`;
	}, [src]);

	const img = src ? <Image alt={name} src={formatedSrc} /> : <Placeholder />;

	return (
		<div className="settings-toggler">
			<div className="profile-image">{img}</div>
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
				className="arrow-toggler lucide lucide-chevron-down"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</div>
	);
};
