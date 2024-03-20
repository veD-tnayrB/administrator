import { Profiles } from '@essential-js/admin-server/engines/profiles';
import { Application, Request, Response } from 'express';
import * as formidable from 'formidable';
import * as path from 'path';
import { Route, ISuccess, ResponseType, checkToken } from '@essential-js/admin-server/helpers';
import { Response as ResponseAPI } from '@bgroup/helpers/response';

class ProfilesRoutes extends Route {
	constructor() {
		super({
			manager: Profiles,
			endpoints: {
				plural: 'profiles',
				singular: 'profile',
			},
		});
	}
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
		app.post('/profiles/import', checkToken, this.bulkImport);
		app.post(`/profiles/generate-report/:type`, checkToken, this.generateReport);
		app.get(`/profiles/get-template/:type`, checkToken, this.getTemplate);
	};
}

export const profiles = new ProfilesRoutes();
