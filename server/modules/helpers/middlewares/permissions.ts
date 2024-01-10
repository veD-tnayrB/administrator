import { Op } from 'sequelize';
import { DB } from '@essential-js/admin-server/db';
import { NextFunction, Request, Response } from 'express';

// Middleware para verificar permisos
export /*bundle*/ const checkPermissions = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// Extraer token de acceso del header Authorization
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) return res.status(403).json({ message: 'Access Denied: No token provided.' });

		const accTokenRequest = await DB.models.AccessTokens.findOne({ where: { accessToken: token } });
		if (!accTokenRequest) return res.status(403).json({ message: 'Access Denied: Invalid token.' });
		const accessToken = accTokenRequest.dataValues;

		const userId = accessToken.userId;

		// Obtener la ruta y el método de la solicitud
		const currentPath = req.path;
		const currentMethod = req.method;

		// Verificar si el usuario tiene permisos para la ruta y el método
		const hasPermission = await checkUserPermissions(userId, currentPath, currentMethod);
		if (!hasPermission) {
			return res.status(403).json({ message: 'Access Denied: Insufficient permissions.' });
		}

		next();
	} catch (error) {
		console.error('Permissions Middleware Error:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

// Función para verificar permisos del usuario
async function checkUserPermissions(userId: string, path: string, method: string) {
	// Obtener los perfiles del usuario
	const profiles = await DB.models.UsersProfiles.findAll({
		where: { userId },
		include: [
			{
				model: DB.models.Profiles,
				as: 'profile',
			},
		],
	});

	// Obtener los IDs de los perfiles
	const profileIds = profiles.map(profile => profile.dataValues.profileId);

	// Obtener las rutas de la API que coincidan con la ruta y el método
	const apiRoutesRequest = await DB.models.ApiRoutes.findAll({
		where: {
			path,
			method,
		},
		include: [
			{
				model: DB.models.ApiModules,
				as: 'apiModule',
			},
		],
	});
	const apiRoutes = apiRoutesRequest.map(route => route.dataValues);

	// Verificar si alguna de las rutas tiene permisos asociados con los perfiles del usuario
	for (let route of apiRoutes) {
		const permissions = await DB.models.ProfileApiModulePermissions.findAll({
			where: {
				profileId: { [Op.in]: profileIds },
				apiModuleId: route.apiModuleId,
			},
			include: [
				{
					model: DB.models.Permissions,
					as: 'permission',
				},
			],
		});

		// Si se encuentra algún permiso, el usuario tiene acceso
		if (permissions.length > 0) return true;
	}

	// Si no se encuentra ningún permiso, el acceso es denegado
	return false;
}
