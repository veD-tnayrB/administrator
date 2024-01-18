import { sign, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { DB } from '@essential-js/admin-server/db';

class JWT {
	#messageErrorTokenJWT = 'TokenExpiredError';

	private secretKey: string;

	constructor() {
		this.secretKey = process.env.SECRET_KEY || 'defaultSecretKey';
	}

	public init(secretKey: string): void {
		this.secretKey = secretKey;
	}
	generate(payload, expiresIn: string = '1h'): string {
		return sign(payload, this.secretKey, { expiresIn });
	}

	private authenticate(token: string) {
		if (!token) {
			throw { status: 401, message: 'Access denied, token expired or incorrect' };
		}
		try {
			const decoded = verify(token, this.secretKey);
			return decoded;
		} catch (error) {
			const messageError =
				error.name === this.#messageErrorTokenJWT
					? 'Access denied, token expired'
					: 'Access denied, token incorrect';
			this.#removeToken(token);
			throw { status: 403, message: messageError };
		}
	}

	#removeToken = async (token: string) => {
		await DB.models.AccessTokens.destroy({ where: { accessToken: token } });
	};

	verify = (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Access denied, token not provided' });
		}

		try {
			const decodedToken = this.authenticate(token);
			next();
		} catch (error) {
			return res.status(error.status || 500).json({ message: error.message });
		}
	};

	update(token: string, newExpiresIn: string = '1h'): string {
		const decodedToken = verify(token, this.secretKey, { ignoreExpiration: true });

		if (!decodedToken) {
			throw { status: 401, message: 'Access denied, token expired or incorrect' };
		}

		const { exp, ...payload } = decodedToken;

		return sign(payload, this.secretKey, { expiresIn: newExpiresIn });
	}
}

export /*bundle*/ const jwt = new JWT();
