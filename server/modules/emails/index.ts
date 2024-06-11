import * as nodemailer from 'nodemailer';

export /*bundle*/ const mailer = nodemailer.createTransport({
	host: process.env.MAILER_HOST,
	port: process.env.MAILER_PORT,
	secure: true,
	auth: {
		user: process.env.MAILER_FROM,
		pass: process.env.MAILER_PASS,
	},
});
