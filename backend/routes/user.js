const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multerImages-config");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", auth, userCtrl.deleteUser);
router.put("/:id", auth, multer, userCtrl.updateUser);
router.get("/:id", userCtrl.getOneUser);
router.get("/", userCtrl.getUser);
router.post("/access", userCtrl.getAccessToken);

module.exports = router;
