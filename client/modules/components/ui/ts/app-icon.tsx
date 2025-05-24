import { Icon } from 'pragmate-ui/icons';
import React from 'react';
import { getAttributes } from './get-attributes';

export /*bundle*/ function AppIcon(properties) {
	const attrs = getAttributes(properties);

	return <Icon {...attrs} />;
}
