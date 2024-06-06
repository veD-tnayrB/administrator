import React from 'react';
import { session } from '@essential-js/admin/auth';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Dialog } from '@essential-js/admin/components/dialog';
import { ProfileImage } from './image';
import { Button } from 'pragmate-ui/components';
import { routing } from '@beyond-js/kernel/routing';

export const Profile = () => {
	const [user, setUser] = React.useState(session.user);
	useBinder([session], () => setUser({ ...session.user }));

	const options = {
		toggler: {
			className: 'dialog-toggler',
			children: <ProfileImage name={user.fullName} src={user.profileImg} />,
			name: 'user-profile',
		},
	};

	const goToProfile = () => {
		routing.pushState(`/user/profile`);
	};

	return (
		<div className="profile">
			<Dialog {...options}>
				<Button onClick={goToProfile} className="option">
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
						className="lucide lucide-user"
					>
						<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
					Profile
				</Button>
			</Dialog>
		</div>
	);
};
