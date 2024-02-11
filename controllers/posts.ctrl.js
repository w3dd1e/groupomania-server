const Post = require("../models/post.model");

//TODO GET USERID FROM JWT
exports.createPost = async (req, res, next) => {
  const post = await Post.create({
    user_id: req.body.userId,
    headline: req.body.headline,
    content: req.body.content,
  });
  post
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
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
  Post.findOne({
    where: {
      post_id: req.params.id,
    },
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
        message: "Post updated successfully!",
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
        message: "Deleted!",
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
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
