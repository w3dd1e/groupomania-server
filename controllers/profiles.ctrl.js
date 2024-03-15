const Profile = require("../models/user.model");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.getProfile = (req, res, next) => {
  Profile.findOne({
    where: {
      user_id: req.params.id,
    },
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
