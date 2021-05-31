const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User')
const cryptojs = require('crypto-js')

require("dotenv").config()//secret

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          //email: req.body.email,
          email: cryptojs.HmacSHA256(req.body.email, process.env.EMAIL).toString(), // cryptage de l'email, méthode 'HmacSHA256' SANS salage (pour pouvoir ensuite rechercher l'utilisateur simplement lors du login)
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => {
            console.error(error.message)
            return res.status(400).json({ error })
          });
      })
      .catch(error => {
        console.error(error.message)
        return res.status(500).json({ error })
      });
  }
  
  exports.login = (req, res, next) => {
    let cryptedResearchedEmail = cryptojs.HmacSHA256(req.body.email, process.env.EMAIL).toString()
    console.log(cryptedResearchedEmail)
      User.findOne({ cryptedResearchedEmail })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN_KEY,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => {
            console.error(error.message)
            return res.status(500).json({ error })
          });
      })
      .catch(error => {
        console.error(error.message)
        return res.status(500).json({ error })
      });
};