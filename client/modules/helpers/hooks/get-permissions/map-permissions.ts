export const mapPermissions = (flatPermissions: Record<string, string>[]) => {
	const map = new Map<string, Record<string, string>>();
	flatPermissions.forEach((item) => map.set(item.actionName, item));

	return map;
};
