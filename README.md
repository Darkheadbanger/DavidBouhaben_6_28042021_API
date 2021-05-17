# DavidBouhaben_6_28042021_API

OpenClassrooms Projet 6 - API backend SoPekocko "Piquante"
6eme projet de la formation en ligne de développeur web d'OpenClassrooms

Scénario
Développement d'une application web nommé "Piquante", cet un application de notation de la sauce piquante et permet aux utilisateurs de mettre en ligne leur sauces, de modifier la sauce que l'utilisateur a crée, de l'effacer et d'aimer ou de ne pas aimer la sauce. Parcontre, l'utilisateur ne peut pas modifier ou effacer la sauce d'un autre utilisateurs.
Dans ce projet, le but est de créer la partie backend pour pouvoir communiquer avec la partie front end qui a déjà été dévéloppé et fourni.

Objectifs et la compéténces attendu et évaluées pour ce projet

    1. La création de l'API (Application programming interfaces) REST
    2. La sécurité de l'application WEB en respectant la norme de OWASP et RGPD
    3. Creation de serveur avec le framework Node.js
    4. framework Express
    5. Creation de la base de données mongoDB
        A.Hébérgement sur mongoDB
        B.Opérations relatives à la base de données fait avec la pack Mongoose

Mésure de sécurité mises en place

    * Hashage du mot de passe utilisateurs avec bcrypt
    * Connexion et manipulation sécurisées de la base de donées avec Mongoose
    * Utilisation de mongoos-unique-validator pour être sur que l'email de l'utilisateur sois unique dans la base de donées
    * Cacher les données sensibles en utilisant le variables d'environnement dotenv
    * Utilisation de tokken session avec jsonwebtoken pour l'authentification de l'utilisateur
    * Protection des headers avec helmet

Pour tester l'application

⚠️ ATTENTION, possible problème de version avec le frontend fournis par OpenClassroom car la version angular utilisée est la vérsion obsoletes, veuillez utiliser cette version mise à jour et non la version fournit par OpenCalssroom

1. Cloner le frontend de l'application, et le lancer:
    * Dans votre environnement de developpement, acceder au termonal puis acceder au dossier au frontend en utilisant le cette manipulation, cd 'your path to frontend'
    * installer la dépendences du front end: npm install ou npm i
    * lancer le frontend: ng serve ou npm start

2. Cloner ce respository backend⬇️

3. Dans votre backend, ajouter un fichier de configuration nommé ".env" à la rachine du backend. A l'intérieur, 5 variables d'environnement "secrètes" sont définies: 
    * DATABASE = 'lien_de_votre_connexion_vers_votre_base_de_données"
    * TOKEN_KEY = 'clé_secrète_pour_crypter_le_token'
    * EMAIL = 'clé_secrète_pour_crypter_les_mails'
    * COOKIE = 'clé_secrète_pour_crypter_la_cookiesession'
    * FRONTEND_ORIGIN = 'http://localhost:4200'

4. Lancer le backend:
    * Ouvert un autre terminal, et acceder au backend avec: cd 'path yo tou backend'
    * Installer la dépendences: npm i ou npm install
    * lance node server: nodemon server.js ou nodemon server

5. Le front end est disponible à l'adresse http://localhost:4200

6. Pour des tests spécifiques (avec postman par exemple), le backend répond à l'adresse: http://localhost:3000 (attention: authentification requise pour toutes les routes /api/sauces/)

ℹ️ Problèmes de version du frontend

La partie frontend fourni par OpenClassroom pose certains problèmes car il a été développé avec l'angular version 7 qui est obsolete et provoque certains problèmes avec ma machine (sous windows) car la version de Node.js que 'utilise est trop récente
Pour faire fonctionner la partie frontend, voici la solution :

    1. Suivez tout simplement ce tutoriel mais, il faut recommencer la page 6 à chaque fois que le terminal demande de nettoyer la branche.
