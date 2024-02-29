const Profile = require("../models/profile.model");
const jwt = require("jsonwebtoken");

exports.getProfile = (req, res, next) => {
  Profile.findOne({
    where: {
      user_id: req.params.id,
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

exports.updateProfile = async (req, res, next) => {
  await Profile.update()
    .then(() => {
      res.status(201).json({
        message: "Profile updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteProfile = async (req, res, next) => {
  await Profile.destroy()

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
