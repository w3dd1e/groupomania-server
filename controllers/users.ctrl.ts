import { eq } from 'drizzle-orm';
import { db } from '../database/db.ts';
import * as schema from '../models/schema.ts';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const jwt = jsonwebtoken;

const users = schema.users;

export const signup = async (req, res) => {
	const { email, password, username } = await req.body;
	const hash = await bcrypt.hash(password, 10);
	try {
		await db.insert(users).values({
			email,
			password: hash,
			username,
		});
		await res.status(201).json({ message: 'User created successfully' });
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, email));
		if (!user) {
			return res.status(401).json({
				error: new Error('User not found.'),
				message: 'User not found.',
			});
		}
		bcrypt.compare(password, user.password, (err, valid) => {
			try {
				if (!valid) {
					return res.status(401).json({
						error: new Error('Incorrect password'),
						message: 'Incorrect password',
					});
				}

				const token = jwt.sign(
					{ userId: user.userId },
					'RANDOM_TOKEN_SECRET',
					{ expiresIn: '24h' }
				);
				res.status(200).json({
					userId: user.userId,
					token: token,
					message: 'Login successful!',
				});
			} catch (err) {
				res.status(500).json({ error: err });
			}
		});
	} catch (err) {
		res.status(500).json({ error: err });
	}
};
