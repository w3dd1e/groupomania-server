const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const profileCtrl = require("../controllers/profiles.ctrl");

router.get("/profile/:id", auth, profileCtrl.getProfile);
router.put("/profile/:id", auth, profileCtrl.updateProfile);
router.delete("/profile/:id", auth, profileCtrl.deleteProfile);

module.exports = router;
