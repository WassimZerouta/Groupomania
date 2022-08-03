const db = require(`../database/database`);

exports.createComment = (req, res, next) => {
  const comment = new db.Comment({
    ...req.body,
    PostId: req.params.id,
    UserId: req.params.userId,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Comment enregistré !" }))
    .catch(error => res.status(400).json({ error }));
};

exports.updateComment = (req, res, next) => {
  db.Comment.findOne({ where: { commentId: req.params.commentId } })
    .then(comment => {
      if (!comment) {
        return res.status(401).json({ error: "Comment non trouvé !" });
      }
      db.Comment.update(
        {
          content: req.body.content,
        },

        { where: { commentId: req.params.commentId } }
      )
        .then(() => res.status(200).json({ message: "Comment modifié !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  db.Comment.findOne({ where: { commentId: req.params.commentId } }).then(
    comment => {
      if (!comment) {
        return res.status(404).json({
          error: new Error("Comment non trouvé !"),
        });
      }
      if (comment.userId !== req.auth.userId) {
        return res.status(401).json({
          error: new Error("Requete non autorisé !"),
        });
      }
      db.Comment.destroy({ where: { commentId: req.params.commentId } })
        .then(() => res.status(200).json({ message: "Comment supprimé !" }))
        .catch(error => res.status(400).json({ error }));
    }
  );
};

exports.getOneComment = (req, res, next) => {
  db.Comment.findOne({ _id: req.params.commentId })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
  console.log(req.params.commentId);
};

exports.getComment = (req, res, next) => {
  db.Comment.findAll()
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({ error }));
};
