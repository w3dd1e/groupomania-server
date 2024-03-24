const Profile = require('../models/user.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.getProfile = (req, res, next) => {
	Profile.findByPk(req.params.id, {
		attributes: [
			'username',
			'fullName',
			'profileImage',
			'department',
			'location',
			'bio',
		],
	})

		.then((profile) => {
			res.status(200).json(profile);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

exports.updateProfile = async (req, res, next) => {
	await Profile.update(
		{
			username: req.body.username,
			fullName: req.body.fullName,
			profileImage: req.body.profileImage,
			department: req.body.department,
			location: req.body.location,
			bio: req.body.bio,
		},
		{
			where: {
				user_id: req.params.id,
			},
		}
	)

		.then(() => {
			res.status(201).json({
				message: 'Profile updated successfully!',
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.deleteProfile = async (req, res, next) => {
	await Profile.destroy({ where: { user_id: req.params.id } })

		.then(() => {
			res.status(200).json({
				message: 'Accout Deleted!',
			});
		})
		.catch((error) => {
			console.log(error);

			res.status(400).json({
				error: error,
			});
		});
};
