const Sauce = require("../model/Sauce");
const fs = require("fs");// permet de modifier le ficher et de l'effacer

// Les codes pour chaque routes
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  //delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    usersDisliked: [],
    usersLiked: [],
    dislikes: 0,
    likes: 0,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};

exports.createLikeSauce = (req, res, next) => {
  const sauceBodyLike = JSON.parse(req.body.like); // Je créer une variable pour traduire la requête like à l'intérieur du body
  console.log(req.body.like);
  //const reqBodySauce = req.body.sauce // Je créer une variable pour traduire la requête like à l'intérieur du body
  //const reqBodySauceParsed = req.body.sauce; // Je créer une variable pour traduire la requête like à l'intérieur du body
  /*const sauceObject = new Sauce({
    ...reqBodySauceParsed,
  });*/
  const userId = req.body.userId;
  const likes = req.body.likes;
  const dislikes = req.body.dislikes;
  const usersLiked = req.body.usersLiked;
  const usersDisliked = req.body.usersLiked;

  console.log(req.params.id)
  Sauce.findOne({ _id: req.params.id }) // Je compare l'Id qui a déjà liker pourqu'ils ne puissent pas liker/disliker deux fois
    // Ici je crée une promise, si like, dislike et 0 (annuler like et dislike) et fait et il n'y a pas de problème alors  on les pousse au front end, si ca ne fonctionne pas on catch l'erreur 400
    .then(sauce => {
      console.log(sauce)
      switch (sauceBodyLike) {
        case 1:
          Sauce.updateOne(
            { _id: req.params.id },
            { $push: { usersLiked: userId }, $inc: { likes: 1 } }
          )
            .then(() => res.status(201).json({ message: "Objet aimée !" }))
            .catch((error) => {
              console.error(error.message);
              return res.status(400).json({ error });
            });
          break;
        case -1:
          Sauce.updateOne(
            { _id: req.params.id } /*{sauceObject, _id: req.params.id},*/,
            { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } }
          )
            .then(() => res.status(201).json({ message: "Objet détestée !" }))
            .catch((error) => {
              console.error(error.message);
              return res.status(400).json({ error });
            });
          break;
        case 0:
          let usersLikedArray = sauce.usersLiked // Je récupère le choix de usersLiked
          let foundUserLiked = usersLikedArray.includes(userId)// Je récupère l'id des gens qui ont liker
          console.log(foundUserLiked)
          let userDislikedArray = sauce.usersDisliked// Comme en haut sauf que pour accer l'id des gens qui ont disliker
          let foundUserDisliked = userDislikedArray.includes(userId)
          console.log(foundUserDisliked)

          if(foundUserLiked){// Si on trouve l'id de user qui a liké, alors on enleve le 0
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          )
            .then(() => res.status(201).json({ message: "like annulé !" }))
            .catch((error) => {
              console.error(error.message);
              return res.status(400).json({ error });
            });
          }
          if(foundUserDisliked){
            Sauce.updateOne(
              { _id: req.params.id },
              { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
            )
              .then(() => res.status(201).json({ message: "dislike annulé !" }))
              .catch((error) => {
                console.error(error.message);
                return res.status(400).json({ error });
              });    
          }
          break;
        default:
          throw new Exception(
            "Impossible, vous ne pouvez pas aimer et ne pas aimer en même temps !"
          );
      }
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(400).json({ error });
    });
};

exports.getOneSauce = (req, res, next) => {
  {withCredentials: ture}
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.modifySauce = (req, res, next) => {
  console.log(req.body);
  const reqBodySauce = req.body;
  const sauceObject = req.file
    ? {
        ...reqBodySauce,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => {
      res.status(200).json({ message: "Objet modifié !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  {withCredentials: ture}
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
