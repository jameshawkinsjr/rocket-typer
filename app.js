const mongoose = require ('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./config/keys').mongoURI;

const app = express();
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

io.on('connection', (socket) => {
  console.log("Socket connected!");

  socket.on('disconnect', () => {
    console.log("Socket disconnected!");
  })
})



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

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

// app.listen(port, () => console.log(`Server is running on port ${port}`));