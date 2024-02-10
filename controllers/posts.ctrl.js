const Post = require("../models/post.model");

exports.createPost = (req, res, next) => {
  req.body.post = JSON.parse(req.body.post);
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    userId: req.body.post.userId,
    name: req.body.post.name,
    manufacturer: req.body.post.manufacturer,
    description: req.body.post.description,
    mainPepper: req.body.post.mainPepper,
    imageUrl: url + "/images/" + req.file.filename,
    heat: req.body.post.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
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
      console.log(post.imageUrl);
      console.log(error);
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
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

exports.updatePost = (req, res, next) => {
  let post = new Post({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.post = JSON.parse(req.body.post);
    post = {
      _id: req.params.id,
      userId: req.body.post.userId,
      name: req.body.post.name,
      manufacturer: req.body.post.manufacturer,
      description: req.body.post.description,
      mainPepper: req.body.post.mainPepper,
      imageUrl: url + "/images/" + req.file.filename,
      heat: req.body.post.heat,
    };
  } else {
    post = {
      userId: req.body.userid,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
    };
  }
  Post.updateOne({ _id: req.params.id }, post)
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

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    const filename = post.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Post.deleteOne({ _id: req.params.id })
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
    });
  });
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
