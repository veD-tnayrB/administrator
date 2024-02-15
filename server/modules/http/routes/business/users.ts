import { Users } from '@essential-js/admin-server/engines/users';
import { Route, ISuccess, ResponseType, checkToken } from '@essential-js/admin-server/helpers';
import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Application, Request, Response } from 'express';
import * as formidable from 'formidable';
import * as path from 'path';

class UsersRoutes extends Route {
	constructor() {
		super({
			manager: Users,
			endpoints: {
				plural: 'users',
				singular: 'user',
			},
		});
	}

	getRegisteredUsersByMonth = async (req: Request, res: Response) => {
		try {
			const response: ResponseType = await this.manager.getRegisteredUsersByMonth({
				year: Number(req.params.year),
			});
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response as ISuccess);
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /list', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	bulkImport = async (req: Request, res: Response) => {
		try {
			console.log('BULK IMPORTATION');
			const form = new formidable.IncomingForm();

			// Configura el directorio de carga a la carpeta temp
			form.uploadDir = path.join(__dirname, 'temp');
			form.keepExtensions = true;
			form.maxFiles = 1;

			let savedFilePath = ''; // Variable para almacenar la ruta del archivo guardado

			form.on('fileBegin', (name, file) => {
				// Crea un nuevo nombre de archivo, manteniendo la extensión original
				const extension = path.extname(file.originalFilename);
				const newFilename = `${Date.now()}${extension}`;
				const fullPath = path.join(form.uploadDir, newFilename);
				file.filepath = fullPath;
				savedFilePath = fullPath; // Guarda la ruta completa del archivo
			});

			await new Promise((resolve, reject) => {
				form.parse(req, (err, fields, files) => {
					console.log('Parsing files', { err, fields, files });
					if (err) reject(err);
					resolve({ fields, files });
				});
			});

			console.log('Archivo cargado y guardado en:', savedFilePath);

			const finalResponse = await this.manager.bulkImport(savedFilePath);
			console.log('finalResponse => ', finalResponse);
			// Retorna el nombre del archivo como parte de la respuesta
			return res.status(200).json({
				status: true,
				message: 'File uploaded successfully',
				filePath: savedFilePath,
			});
		} catch (exc) {
			console.error('Error in bulk importation', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		super.setup(app);
		app.get('/users/get-registered-users-by-month/:year', checkToken, this.getRegisteredUsersByMonth);
		app.post('/users/import', this.bulkImport);
	};
}

export const users = new UsersRoutes();
