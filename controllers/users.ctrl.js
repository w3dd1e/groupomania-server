const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
	bcrypt.hash(req.body.password, 10).then(async (hash) => {
		const user = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: hash,
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
	});
};

exports.login = async (req, res, next) => {
	await User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(401).json({
					error: new Error('User not found!'),
					message: 'User not found!',
				});
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({
							error: new Error('Incorrect password!'),
							message: 'Incorrect password!',
						});
					}
					const token = jwt.sign(
						{ userId: user.user_id },
						'RANDOM_TOKEN_SECRET',
						{
							expiresIn: '24h',
						}
					);
					res.status(200).json({
						userId: user.user_id,
						username: user.username,
						token: token,
						message: 'Login successful!',
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
