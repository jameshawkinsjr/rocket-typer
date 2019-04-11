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
  app.use('/api/users', users);
  app.use('/api/races', races);
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  });
}

io.on('connection', (socket) => {
  // console.log("Client connected to socket!");

  socket.on('send_progress', (data) => {
    data.playerId = socket.id;
    socket.broadcast.emit('receive_progress', data);
    socket.emit('receive_progress', data);
  });

  socket.on('playerDisconnect', (data) => {
    data.playerId = socket.id;
    socket.broadcast.emit('playerLeft', data);
  });
  
  socket.on('joined', (data) => {
    data.playerId = socket.id;
    socket.broadcast.emit('newPlayer', data);
    data.username = data.username + ` (You)`;
    socket.emit('newPlayer', data);
  });

  socket.on('startGame', (data) => {
    socket.broadcast.emit('playGame', data);
    socket.emit('playGame', data);
  });

  socket.on('disconnect', () => {
    // console.log("Client disconnected from socket!");
    let data = {};
    data.playerId = socket.id;
    socket.broadcast.emit('playerLeft', data);
    io.emit('disconnect', socket.id);
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

