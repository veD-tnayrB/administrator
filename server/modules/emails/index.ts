import * as nodemailer from 'nodemailer';

// Print variables
console.log('process.env.MAILER_HOST', process.env.MAILER_HOST);
console.log('process.env.MAILER_PORT', process.env.MAILER_PORT);
console.log('process.env.MAILER_USER', process.env.MAILER_USER);
console.log('process.env.MAILER_PASS', process.env.MAILER_PASS);

export /*bundle*/ const mailer = nodemailer.createTransport({
	host: process.env.MAILER_HOST,
	port: process.env.MAILER_PORT,
	secure: false,
	auth: {
		user: process.env.MAILER_USER,
		pass: process.env.MAILER_PASS,
	},
});
