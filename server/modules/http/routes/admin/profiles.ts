import { Response as ResponseAPI } from '@bgroup/helpers/response';
import { Profiles } from '@essential-js/admin-server/engines/profiles';
import { Route, checkPermission, checkToken } from '@essential-js/admin-server/helpers';
import { Application, Request, Response } from 'express';
import * as formidable from 'formidable';
import * as path from 'path';

class ProfilesRoutes extends Route {
	constructor() {
		super({
			manager: Profiles,
		});
	}
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

			const finalResponse = await Profiles.bulkImport({ filepath: savedFilePath, fileType });
			if (!finalResponse.status) throw finalResponse.error;

			return res.status(200).json({
				status: true,
				results: finalResponse.data,
			});
		} catch (exc) {
			console.error('Error in bulk importation', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc.error });
			res.status(500).send(responseError);
		}
	};

	generateReport = async (req: Request, res: Response) => {
		try {
			let { params, header } = req.body;
			const { type } = req.params;
			const response = await Profiles.generateReport({
				header,
				params,
				type: type as 'xlsx' | 'csv',
			});
			if ((!response.status && 'error' in response) || !response.data) throw response.error;

			const excelPath = path.join(__dirname, response.data.pathFile);
			res.setHeader('Content-Type', 'text/html');

			return res.sendFile(excelPath);
		} catch (exc) {
			console.error('Error /generate-report', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc.error });
			res.status(500).send(responseError);
		}
	};

	getTemplate = async (req: Request, res: Response) => {
		try {
			const { type } = req.params;
			const response = await Profiles.getTemplate({ type: type as 'xlsx' | 'csv' });
			if ((!response.status && 'error' in response) || !response.data) throw response.error;

			const excelPath = path.join(__dirname, response.data.pathFile);
			res.setHeader('Content-Type', 'text/html');
			return res.sendFile(excelPath);
		} catch (exc) {
			console.error('Error /get-template', exc);
			const responseError = ResponseAPI.error({ code: 500, message: exc.error });
			res.status(500).send(responseError);
		}
	};

	setup = (app: Application) => {
		app.post('/admin/profiles/import', checkToken, checkPermission('profiles.import'), this.bulkImport);
		app.get(
			`/admin/profiles/get-template/:type`,
			checkToken,
			checkPermission('profiles.get-template'),
			this.getTemplate
		);
		app.post(
			`/admin/profiles/generate-report/:type`,
			checkToken,
			checkPermission('profiles.generate-report'),
			this.generateReport
		);
		app.post(`/admin/profile`, checkToken, checkPermission('profiles.create'), this.create);
		app.put(`/admin/profile/:id`, checkToken, checkPermission('profiles.update'), this.update);
		app.get(`/admin/profiles`, checkToken, checkPermission('profiles.list'), this.list);
		app.get(`/admin/profile/:id`, checkToken, checkPermission('profiles.get'), this.get);
	};
}

export const profiles = new ProfilesRoutes();
