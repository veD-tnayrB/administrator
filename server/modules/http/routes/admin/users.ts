import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Users } from '@essential-js/admin-server/engines/users';
import { Route, checkPermission, checkToken } from '@essential-js/admin-server/helpers';
import { Application, Request, Response } from 'express';
import * as formidable from 'formidable';
import * as path from 'path';

class UsersRoutes extends Route {
	constructor() {
		super({
			manager: Users,
		});
	}

	getRegisteredUsersByMonth = async (req: Request, res: Response) => {
		try {
			const response = await Users.getRegisteredUsersByMonth({
				year: Number(req.params.year),
			});
			if (!response.status && 'error' in response) throw response.error;
			const formatedResponse = response;
			return res.status(200).json(formatedResponse);
		} catch (exc) {
			console.error('Error /list', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc as string });
			res.status(500).send(responseError);
		}
	};

	bulkImport = async (req: Request, res: Response) => {
		try {
			const form = new formidable.IncomingForm();
			const uploadDir = path.join(__dirname, 'excel/temp');

			let savedFilePath = '';
			let fileType = '';

			form.on('fileBegin', (name, file) => {
				if (file.originalFilename) {
					const extension = path.extname(file.originalFilename);
					const newFilename = `${Date.now()}${extension}`;
					const fullPath = path.join(uploadDir, newFilename);
					file.filepath = fullPath;
					savedFilePath = fullPath;
					fileType = extension;
				}
			});

			await new Promise((resolve, reject) => {
				form.parse(req, (err, fields, files) => {
					if (err) reject(err);
					resolve({ fields, files });
				});
			});

			const finalResponse = await Users.bulkImport({ filepath: savedFilePath, fileType });
			if (!finalResponse.status) throw finalResponse.error;

			return res.status(200).json({
				status: true,
				results: finalResponse.data,
			});
		} catch (exc) {
			console.error('Error in bulk importation', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc as string });
			res.status(500).send(responseError);
		}
	};

	generateReport = async (req: Request, res: Response) => {
		try {
			let { params, header } = req.body;
			const { type } = req.params;
			const response = await Users.generateReport({ header, params, type: type as 'xlsx' | 'csv' });
			if ((!response.status && 'error' in response) || !response.data) throw response.error;

			const excelPath = path.join(__dirname, response.data.pathFile);
			res.setHeader('Content-Type', 'text/html');
			return res.sendFile(excelPath);
		} catch (exc) {
			console.error('Error /generate-report', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc as string });
			res.status(500).send(responseError);
		}
	};

	getTemplate = async (req: Request, res: Response) => {
		try {
			const { type } = req.params;
			const response = await Users.getTemplate({ type: type as 'xlsx' | 'csv' });
			if ((!response.status && 'error' in response) || !response.data) throw response.error;

			const excelPath = path.join(__dirname, response.data.pathFile);
			res.setHeader('Content-Type', 'text/html');
			return res.sendFile(excelPath);
		} catch (exc) {
			console.error('Error /get-template', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc as string });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		app.get('/admin/users/get-registered-users-by-month/:year', checkToken, this.getRegisteredUsersByMonth);
		app.post('/admin/users/import', checkToken, checkPermission('users.import'), this.bulkImport);
		app.get(`/admin/users/get-template/:type`, checkToken, checkPermission('users.get-template'), this.getTemplate);
		app.post(
			`/admin/users/generate-report/:type`,
			checkToken,
			checkPermission('users.generate-report'),
			this.generateReport
		);
		app.get(`/admin/user/:id`, checkToken, checkPermission('users.get'), this.get);
		app.put(`/admin/user/:id`, checkToken, checkPermission('users.update'), this.update);
		app.post(`/admin/user`, checkToken, checkPermission('users.create'), this.create);
		app.get(`/admin/users`, checkToken, checkPermission('users.list'), this.list);
	};
}

export const users = new UsersRoutes();
