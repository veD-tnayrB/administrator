import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { session } from '@essential-js/admin/auth';
import { mapPermissions } from './map-permissions';

type Permissions = Map<string, Record<string, string>>;

export /*bundle*/ function usePermissions() {
	const [permissions, setPermissions] = React.useState<Permissions>(mapPermissions(session.user.permissions));
	useBinder([session], () => setPermissions(mapPermissions(session.user.permissions)));

	return permissions;
}
