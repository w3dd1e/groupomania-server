const Model = require('../models/index.model');

const jwt = require('jsonwebtoken');

exports.createPost = async (req, res, next) => {
	const url = req.protocol + '://' + req.get('host');
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	const userId = decodedToken.userId;
	const image =
		req.file !== undefined ? `${url}/images/${req.file.filename}` : null;
	const post = await Model.Post.create({
		user_id: userId,
		headline: req.body.headline,
		content: req.body.content,
		profileImage: image,
	});
	post.save()
		.then(() => {
			res.status(201).json({
				postId: post.post_id,
				message: 'Post saved successfully!',
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
			console.log(error);
		});
};

exports.getOnePost = async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	const userId = decodedToken.userId;
	const readPost = await Model.ReadPost.findOne({
		where: {
			userUserId: userId,
			postPostId: req.params.id,
		},
	});
	if (readPost === null) {
		Model.ReadPost.create({
			userUserId: userId,
			user_id: userId,
			post_id: req.params.id,
			postPostId: req.params.id,
		});
	}
	await Model.Post.findByPk(req.params.id, {
		include: [
			{
				model: Model.User,
				attributes: ['username', 'profileImage'],
			},
		],
	})

		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

exports.updatePost = async (req, res, next) => {
	const updateFields = {
		headline: req.body.headline,
		content: req.body.content,
	};
	if (req.file) {
		const url = req.protocol + '://' + req.get('host');
		updateFields.imageUrl = `${url}/images/${req.file.filename}`;
	}
	await Model.Post.update(updateFields, { where: { post_id: req.params.id } })
		.then(() => {
			res.status(201).json({
				message: 'Post updated successfully!',
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.deletePost = async (req, res, next) => {
	await Model.Post.destroy({ where: { post_id: req.params.id } })

		.then(() => {
			res.status(200).json({
				message: 'Post deleted!',
			});
		})
		.catch((error) => {
			console.log(error);

			res.status(400).json({
				error: error,
			});
		});
};

exports.getAllPosts = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		const userId = decodedToken.userId;
		//Get all Posts
		const posts = await Model.Post.findAll({
			limit: 12,
			order: [['createdAt', 'DESC']],
			offset: req.query.offset,
			include: [
				{ model: Model.User, attributes: ['username', 'profileImage'] },
			],
		});
		//Get list of posts that user has seen
		const userReadPosts = await Model.ReadPost.findAll({
			where: { user_id: userId },
		});

		//Create set of user's read post ids
		const userReadPostIds = await new Set(
			userReadPosts.map((readPost) => readPost.post_id)
		);
		// Modify each post object to include read_status value before sending response
		for (const post of posts) {
			post.dataValues.read_status = userReadPostIds.has(post.post_id);
		}

		await res.status(200).json(posts);
	} catch (error) {
		res.status(400).json({
			error: error,
		});
	}
};
