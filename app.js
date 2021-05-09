const express = require('express') //Inclure
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const stuffRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')
const path = require('path');
const helmet = require('helmet')// On incluet le flagHttpOnly appeler Helmet sur express pour sécuriser les cookies et d'empecher un attaque XSS

mongoose.connect(
    'mongodb+srv://Darkheadbanger:GrXzPj28TM6661@clusteropc.g2x2f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express()

app.use((req, res, next) => {//CORS (cross origine ressources sharing) pour éviter l'attaque cross-site request forgery (CSRF) et pour respecter la sécurité OWASP
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next();
})

app.use(bodyParser.json())
app.use(helmet())// Helmet pour sécruiser et respecter OWASP

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app