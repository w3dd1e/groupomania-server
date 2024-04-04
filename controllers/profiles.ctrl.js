const Model = require('../models/index.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.getProfile = (req, res, next) => {
	Model.User.findByPk(req.params.id, {
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
	const updateFields = {
		username: req.body.username,
		fullName: req.body.fullName,
		profileImage: req.body.profileImage,
		department: req.body.department,
		location: req.body.location,
		bio: req.body.bio,
	};
	if (req.file) {
		const url = req.protocol + '://' + req.get('host');
		updateFields.profileImage = `${url}/images/${req.file.filename}`;
	}
	await Model.User.update(updateFields, {
		where: {
			user_id: req.params.id,
		},
	})

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
	await Model.User.destroy({ where: { user_id: req.params.id } })

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
