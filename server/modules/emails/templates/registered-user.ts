import * as dotenv from 'dotenv';
dotenv.config();

const companyName = process.env.COMPANY_NAME || 'Essential';
const companyLogo = process.env.COMPANY_LOGO;

export /*bundle*/ interface IRegisteredUserPayload {
	names: string;
	lastNames: string;
	password: string;
}

export /*bundle*/ const registeredUserTemplate = ({ names, lastNames, password }: IRegisteredUserPayload) => {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: hsl(210, 40%, 96%);
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            background-color: #fff;
            margin: 0 auto;
            padding: 20px;
            color: #67727e;
        }
        .header {
            background-color: #1d7a90;
            color: #fff;
            padding: 20px 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: left;
            line-height: 1.5;
        }
        .footer {
            background-color: #fff;
            padding: 10px 20px;
            text-align: center;
            border-top: 1px solid #67727e;
        }
        img.logo {
            max-width: 100px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <table class="container" width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td class="header">
                <h1>Successful Registration</h1>
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Hello, ${names} ${lastNames}</p>
                <p>Your account has been successfully created in our system! Here are your account details so you can access our services:</p>
                <p><strong>Password:</strong> ${password}</p>
                <p>We recommend changing your password at your first login for security reasons.</p>
                <p>If you have any questions or need assistance, please contact our support team.</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                &copy; ${companyName} | All Rights Reserved
            </td>
        </tr>
    </table>
</body>
</html>

	`;
};
