const express = require('express') //Inclure
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const stuffRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')
const path = require('path');
const helmet = require('helmet')// On incluet le flagHttpOnly appeler Helmet sur express pour sécuriser les cookies et d'empecher un attaque XSS

require("dotenv").config()//

mongoose.connect(
    process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true } 
).then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express()

app.use((req, res, next) => {//CORS (cross origine ressources sharing) pour éviter l'attaque cross-site request forgery (CSRF) et pour respecter la sécurité OWASP
    //système de sécurité par défault pour bloqué les appelles HTTP de deux servers differents, mais on le désactive car on a 2 servers differents qui doivent pouvoir se communiquer
    res.setHeader('Access-Control-Allow-Origin', "*")//
    //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')//CRUD (create, read, update, delete)
    next();
})

app.use(bodyParser.json())
app.use(helmet())// Helmet pour sécruiser et respecter OWASP

app.use('/images', express.static(path.join(__dirname, 'images')));//multer, endoroit ou telecharger les images
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app