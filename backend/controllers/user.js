const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const db = require(`../database/database`);

const dotenv = require("dotenv");
dotenv.config();

const SECRET_TOKEN = process.env.SECRET_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new db.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        image: req.body.image,
        password: hash,
        token: null,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  db.User.findOne({ where: { email: req.body.email }, raw: true })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            auth: true,
            admin: user.id === 1 ? true : false,
            token: jwt.sign(
              { id: user.id, admin: user.id === 1 ? true : false },
              SECRET_TOKEN,
              {
                expiresIn: "24h",
              }
            ),
            refreshToken: jwt.sign(
              { id: user.id, admin: user.id === 1 ? true : false },
              REFRESH_TOKEN,
              {
                expiresIn: "1y",
              }
            ),
          });
        })

        .catch(error => res.status(500).json({ auth: false, error: "pb" }));
    })

    .catch(error => res.status(500).json({ auth: false, error: "pb" }));
};

exports.getAccessToken = (req, res, next) => {
  db.User.findOne({ where: { email: req.body.email }, raw: true }).then(
    user => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, REFRESH_TOKEN);
      if (!token) {
        res.status(401);
      }

      const refreshedToken = jwt.sign(
        { id: user.id, admin: user.id === 1 ? true : false },
        SECRET_TOKEN,
        {
          expiresIn: "1y",
        }
      );
      res.send({ token: refreshedToken });
    }
  );
};

exports.updateUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } }).then(user => {
    if (user.userId !== req.auth.userId) {
      return res.status(401).json({
        error: new Error("Requete non autorisé !"),
      });
    } else if (user.image != null) {
      const filename = user.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        bcrypt;
        db.User.update(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
            password: user.password,
          },

          { where: { id: req.params.id } }
        )
          .then(() => res.status(200).json({ message: "User modifié !" }))
          .catch(error => res.status(400).json({ error }));
      });
    } else {
      db.User.update(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
          password: user.password,
        },

        { where: { id: req.params.id } }
      )
        .then(() => res.status(200).json({ message: "User modifié !" }))
        .catch(error => res.status(400).json({ error }))

        .catch(error => res.status(500).json({ error }));
    }
  });
};

exports.deleteUser = (req, res, next) => {
  db.User.findOne({ where: { id: req.params.id } }).then(user => {
    if (user.userId !== req.auth.userId) {
      res.status(401).json({ message: "Non autorisé" });
    } else if (user.image !== null) {
      const filename = user.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        db.User.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "User supprimé !" }))
          .catch(error => res.status(400).json({ error }));
      });
    } else if (image === null) {
      db.User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "User supprimé !" }))
        .catch(error => res.status(400).json({ error }));
    }
  });
};

exports.getOneUser = (req, res, next) => {
  db.User.findOne({ id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
  console.log(req.params.id);
};

exports.getUser = (req, res, next) => {
  db.User.findAll({
    include: [
      {
        model: db.Post,
      },
      {
        model: db.Comment,
      },
    ],
  })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
};
