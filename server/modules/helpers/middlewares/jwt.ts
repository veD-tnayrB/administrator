import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';
config();

export /*bundle*/ const checkToken = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
	if (!token) return res.status(401).json({ status: false, error: 'Access denied, token not provided' });

	try {
		jwt.verify(token, process.env.JWT_SECRET);
		next();
	} catch (error) {
		const message = error.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'ICORRECT_TOKEN';
		return res.status(error.status || 403).json({ status: false, error: message });
	}
};
