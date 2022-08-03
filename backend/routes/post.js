const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multerGifs-config");

//___________________POST_________________________

router.post("/:userId", auth, multer, postCtrl.createPost);

router.put("/:userId/:id", auth, postCtrl.updatePost);

router.delete("/:userId/:id", auth, postCtrl.deletePost);

router.get("/:id", postCtrl.getOnePost);

router.get("/", auth, postCtrl.getPost);

//___________________COMMENT_________________________

router.post("/:userId/:id/comment", auth, commentCtrl.createComment);

router.put("/:userId/:id/comment/:commentId", auth, commentCtrl.updateComment);

router.delete(
  "/:userId/:id/comment/:commentId",
  auth,
  commentCtrl.deleteComment
);

router.get("/:id/comment/:commentId", commentCtrl.getOneComment);

router.get("/:id/comment/", commentCtrl.getComment);

module.exports = router;
