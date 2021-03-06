//const https = require('https') //Https pour  respecter la sécruité conseillé par OWASP pour sécruisée les données en transit
const http = require('http') //Https pour  respecter la sécruité conseillé par OWASP pour sécruisée les données en transit
//Hypertext Transfer Protocol, un protocole de communication client-serveur
const app = require('./app')
//const fs = require('fs')
/*
const options = {// ici c'est pour le certificate SSL
    key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
    cert: fs.readFileSync("/srv/www/keys/chain.pem")
}*/

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }else {
    if (port >= 0) {
        return port;
      }
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//const server = https.createServer(options, app);
const server = http.createServer(app);
console.log(server)

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port)
