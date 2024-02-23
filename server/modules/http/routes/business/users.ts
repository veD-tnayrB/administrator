import { Users } from '@essential-js/admin-server/engines/users';
import { Route, ISuccess, ResponseType, checkToken } from '@essential-js/admin-server/helpers';
import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Application, Request, Response } from 'express';
import * as formidable from 'formidable';
import * as path from 'path';

class UsersRoutes extends Route {
	declare manager: Users;

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
			const form = new formidable.IncomingForm();
			form.uploadDir = path.join(__dirname, 'excel/temp');
			form.keepExtensions = true;
			form.maxFiles = 1;

			let savedFilePath = '';
			let fileType = '';

			form.on('fileBegin', (name, file) => {
				const extension = path.extname(file.originalFilename);
				const newFilename = `${Date.now()}${extension}`;
				const fullPath = path.join(form.uploadDir, newFilename);
				file.filepath = fullPath;
				savedFilePath = fullPath;
				fileType = extension;
			});

			await new Promise((resolve, reject) => {
				form.parse(req, (err, fields, files) => {
					console.log('Parsing files', { err, fields, files });
					if (err) reject(err);
					resolve({ fields, files });
				});
			});

			const finalResponse = await this.manager.bulkImport({ filepath: savedFilePath, fileType });
			if (!finalResponse.status) throw finalResponse.error;

			return res.status(200).json({
				status: true,
				results: finalResponse.data,
			});
		} catch (exc) {
			console.error('Error in bulk importation', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	generateReport = async (req: Request, res: Response) => {
		try {
			let { params, header } = req.body;
			const { type } = req.params;
			const response: ResponseType = await this.manager.generateReport({ header, params, type });
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = ResponseAPI.success(response as ISuccess);

			const excelPath = path.join(__dirname, response.data.pathFile);
			return res.sendFile(excelPath);
		} catch (exc) {
			console.error('Error /generate-report', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	getTemplate = async (req: Request, res: Response) => {
		try {
			const { type } = req.params;
			const response: ResponseType = await this.manager.getTemplate({ type });
			if (!response.status && 'error' in response) throw response.error;

			const excelPath = path.join(__dirname, response.data.pathFile);
			return res.sendFile(excelPath);
		} catch (exc) {
			console.error('Error /get-template', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		super.setup(app);
		app.get('/users/get-registered-users-by-month/:year', checkToken, this.getRegisteredUsersByMonth);
		app.post('/users/import', checkToken, this.bulkImport);
		app.post(`/users/generate-report/:type`, checkToken, this.generateReport);
		app.get(`/users/get-template/:type`, checkToken, this.getTemplate);
	};
}

export const users = new UsersRoutes();
