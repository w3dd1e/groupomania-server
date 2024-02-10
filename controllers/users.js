const pool = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const { email, password, username } = req.body;
			pool.query(
				'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *',
				[email, hash, username]
			);
		})
		.then(() => {
			res.status(201).json({
				message: 'User added successfully!',
			});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};

exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error('User not found!'),
				});
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({
							error: new Error('Incorrect password!'),
						});
					}
					const token = jwt.sign(
						{ userId: user._id },
						'RANDOM_TOKEN_SECRET',
						{
							expiresIn: '24h',
						}
					);
					res.status(200).json({
						userId: user._id,
						token: token,
					});
				})
				.catch((error) => {
					res.status(500).json({
						error: error,
					});
				});
		})
		.catch((error) => {
			res.status(500).json({
				error: error,
			});
		});
};
