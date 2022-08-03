const db = require(`../database/database`);
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

exports.createPost = (req, res, next) => {
  const post = new db.Post({
    ...req.body,
    UserId: req.params.userId,
    image: `${req.protocol}://${req.get("host")}/videos/${req.file.filename}`,
  });

  post
    .save()
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch(error => res.status(400).json({ error }));
};

exports.updatePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      if (!post) {
        return res.status(401).json({ error: "Post non trouvé !" });
      }
      db.Post.update(
        {
          ...req.body,
          image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        },

        { where: { id: req.params.id } }
      )
        .then(() => res.status(200).json({ message: "Post modifié !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } }).then(post => {
    if (post.userId !== req.auth.userId) {
      return res.status(401).json({
        error: new Error("Requete non autorisé !"),
      });
    } else {
      const filename = post.image.split("/videos/")[1];
      fs.unlink(`videos/${filename}`, () => {
        db.Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch(error => res.status(400).json({ error }));
      });
    }
  });
};

exports.getOnePost = (req, res, next) => {
  db.Post.findOne({ id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
  console.log(req.params.id);
};

exports.getPost = (req, res, next) => {
  db.Post.findAll({
    include: [
      {
        model: db.Comment,
        include: [db.User],
      },
      {
        model: db.User,
      },
    ],
  })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }));
};
