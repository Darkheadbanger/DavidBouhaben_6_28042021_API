const Sauce = require('../model/Sauce');
const fs = require('fs')

// Les codes pour chaque routes
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  //delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    usersDisliked: [],
    usersLiked: [],
    dislikes: 0,
    likes:0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => {res.status(201).json({ message: 'Objet enregistré !'})})
    .catch(error => {
      console.error(error.message)
      return res.status(400).json({ error })
    });
};

exports.createLikeSauce = (req, res, next) => {
  const sauceObjectBodySauce = JSON.parse(req.body.sauce)
  const sauce = new Sauce
  //delete sauceObject._id
  /*const sauce = new Sauce ({
    ...sauceObject,
    dislikes: 0,
    likes: 0,
    usersDisliked: [],
    usersLiked: []
  })*/
  switch (sauceObjectBodySauce) {
    case 1:
      Sauce.updateOne({ _id: req.params.id },
        {$push:{usersLiked}, $inc:{likes: +1}}
        )
          .then(() => {
            return res.status(201).json({ message: 'Objet aimée !'})
          })    
          .catch(err => {
              console.error(err.message)
              return res.status(400).json({error})
            })    
      break;
    case -1:
      Sauce.updateOne({ _id: req.params.id },
        {$push:{usersDisliked}, $inc:{dislikes: -1}}
        )
          .then(sauce => {
            console.success(sauce.message)
            return res.status(201).json({ message: 'Objet détestée !'})
          })
          .catch(err => {
              console.error(err.message)
              return res.status(400).json({error})
            })    
      break;
    default:
      console.error(err.message)
        return res.status(400).json({error})
  }
  sauce.save()
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {res.status(200).json(sauce)})
  .catch((error) => {res.status(404).json({error})})
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body}
  Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => {res.status(200).json({message: 'Objet modifié !'})})    
    .catch((error) => {res.status(400).json({error});});
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then((sauces) => {res.status(200).json(sauces)})
  .catch((error) => {res.status(400).json({error})}
  );
};