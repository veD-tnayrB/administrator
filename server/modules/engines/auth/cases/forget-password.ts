import { DB } from '@essential-js/admin-server/db';
import { mailer, forgetPasswordTemplate, passwordRecovered } from '@essential-js/admin-server/emails';
import { v4 as uuid } from 'uuid';
import { MD5 } from '@bgroup/helpers/md5';

export interface ISendEmailForgetPassword {
	email: string;
}

export interface IRecoverPassword {
	token: string;
	newPassword: string;
}

export class ForgetPassword {
	static model: typeof DB.models.Users = DB.models.Users;
	static sendEmail = async (params: ISendEmailForgetPassword) => {
		try {
			const user = await ForgetPassword.model.findOne({ where: { email: params.email } });
			if (!user) return { status: true };

			const token = uuid();
			await ForgetPassword.model.update({ forgetPasswordToken: token }, { where: { email: params.email } });

			const { html, subject } = forgetPasswordTemplate({
				url: `${process.env.RECOVER_PASSWORD_LINK}${token}`,
				names: user.dataValues.names,
				lastNames: user.dataValues.lastNames,
				token,
			});

			const response = await mailer.sendMail({
				from: process.env.MAILER_FROM,
				subject,
				html,
				to: params.email,
			});

			if (response.rejected.length) throw 'ERROR_SENDING_EMAIL';
			return { status: true };
		} catch (error) {
			console.error('ERROR SENDING FORGET PASSWORD EMAIL', error);
			return { status: false, error };
		}
	};

	static recover = async (params: IRecoverPassword) => {
		try {
			const user = await ForgetPassword.model.findOne({ where: { forgetPasswordToken: params.token } });
			if (!user) throw 'INCORRECT_TOKEN';

			const newPassword = MD5(params.newPassword);
			await ForgetPassword.model.update(
				{ password: newPassword, forgetPasswordToken: null },
				{ where: { id: user.dataValues.id } },
			);

			const { html, subject } = passwordRecovered({
				names: user.dataValues.names,
				lastNames: user.dataValues.lastNames,
			});
			const response = await mailer.sendMail({
				html,
				subject,
				from: process.env.MAILER_FROM,
				to: user.dataValues.email,
			});
			if (response.rejected.length) throw 'ERROR_SENDING_EMAIL';

			return { status: true };
		} catch (error) {
			return { status: false, error };
		}
	};
}
