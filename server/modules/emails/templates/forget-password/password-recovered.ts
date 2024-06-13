export /*bundle*/ interface IPasswordRecoveryTemplate {
	names: string;
	lastNames: string;
}

const companyName = process.env.COMPANY_NAME || 'Essential';

export /*bundle*/ const passwordRecovered = ({ names, lastNames }: IPasswordRecoveryTemplate) => {
	const subject = 'Password Successfully Recovered';
	const html = `
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
        .button {
            background-color: #1d7a90; /* Primary color */
            color: white !important;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
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
                <h1>Password Recovered</h1>
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Hello, ${names} ${lastNames}</p>
                <p>Your password was successfully updated</p>
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

	return { html, subject };
};
