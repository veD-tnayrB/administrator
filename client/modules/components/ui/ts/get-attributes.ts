import { GENERAL_ICONS } from './icons';

export function getAttributes({ src, icon, name, ...attrs }) {
	delete attrs.children;
	name = name ?? icon;
	icon = GENERAL_ICONS.hasOwnProperty(name) ? GENERAL_ICONS[name] : icon;

	return { icon, ...attrs };
}
