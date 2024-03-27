const Post = require('../models/post.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.createPost = async (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
	const userId = decodedToken.userId;
	const post = await Post.create({
		user_id: userId,
		headline: req.body.headline,
		content: req.body.content,
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

exports.getOnePost = (req, res, next) => {
	Post.findByPk(req.params.id, {
		include: [{ model: User, attributes: ['username', 'profileImage'] }],
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
	await Post.update(
		{ headline: req.body.headline, content: req.body.content },
		{ where: { post_id: req.params.id } }
	)
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
	await Post.destroy({ where: { post_id: req.params.id } })

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

exports.getAllPosts = (req, res, next) => {
	Post.findAll({
		limit: 12,
		order: [['createdAt', 'DESC']],
		offset: req.query.offset,
		include: [{ model: User, attributes: ['username', 'profileImage'] }],
	})
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};
