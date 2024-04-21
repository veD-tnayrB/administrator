import { Request, Response, NextFunction } from 'express';

export /*bundle*/ const checkPermission = (action: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const userPermissions = req.body.session.permissions;
		const hasPermission = userPermissions.some(item => item.actionName === action);
		console.log('USER PERMISSIONS => ', action, hasPermission, userPermissions);

		if (hasPermission) {
			return next();
		} else {
			return res.status(403).json({ status: false, error: 'ACCESS_DENINED' });
		}
	};
};
