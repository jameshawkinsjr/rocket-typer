const mongoose = require ('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./config/keys').mongoURI;
const app = express();

const port = process.env.PORT || 5000;
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const users = require('./routes/api/users');
const races = require('./routes/api/races');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  });
}

io.on('connection', (client) => {
  console.log("Client connected to socket!");

  client.on('SEND_MESSAGE', (data) => {
    client.emit('RECEIVE_MESSAGE', data);
  });

  client.on('subscribeToTimer', (interval) => {
    console.log(`Client is subscribing to timer at the interval of ${interval}`);
    setInterval(() => { client.emit('timer', new Date()); }, interval);
  });

  client.on('disconnect', () => {
    console.log("Client disconnected from socket!");
  });
});

mongoose
    .connect(db, {useNewUrlParser: true})
    .then( () => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/races', races);

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});