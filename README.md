<p align="center">
  <a href="https://www.rockettyper.com/">
    <img src="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_logo.png" alt="rocket typer logo" width="400">
  </a>
</p>

[Live Demo](https://rocket-typer.herokuapp.com/)

# Rocket Typer

Rocket Typer was designed to test your typing speed and see how you stack up against other users. It was build using the following technologies: 
* <strong>Frontend</strong>: React.js with Redux, socket.io
* <strong>Backend</strong>: Node.js with a MongoDB database
* <strong>Other</strong>: SCSS, Express.js, Heroku, Socket.io

*** 
# Features 
* [Play against other users](https://github.com/jameshawkinsjr/rocket-typer#multiplayer)
* [Test your typing speed](https://github.com/jameshawkinsjr/rocket-typer#speed-test)
* [Viewing a user's stats](https://github.com/jameshawkinsjr/rocket-typer#user-profiles)
* [View the global leaderboard](https://github.com/jameshawkinsjr/rocket-typer#global-leaderboard)


<br>

### Multiplayer
Socket.io allows for management of individual multiplayer games. Upon joining the waiting room, a connection to the waiting room websocket is opened and as soon as 3 players have joined, a game can start. By broadcasting each individual user's typing progress through Socket.io, React's local state will render a rocket for each user in the game.

Once the game has been completed, all scores are submitted via an API endpoint and the statistics for the game can be found on each user's profile or on the "Recent Games" tab of the homepage.

<p align="center">
  <a href="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_waiting_room.gif">
    <img src="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_waiting_room.gif" alt="rocket typer">
  </a>
</p>

```js
  io.on('connection', (socket) => {
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
      let data = {};
      data.playerId = socket.id;
      socket.broadcast.emit('playerLeft', data);
      io.emit('disconnect', socket.id);
    });
  });
```

*** 
<br>

### Speed Test
Utilizing keypress event listeners and React's local state, Rocket Typer is able to keep track of correctly typed letters, while calculating words per minute, and accuracy. Upon completion of the given phrase, an API call automatically saves the race, so that it can be posted to the global leaderboard and the user's profile page will reflect the most recent stats.

With React, we're able the user's progress in the game as local state to other components which allow for rendering of the rocket's trip from Earth to Mars.

<p align="center">
  <a href="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer.gif">
    <img src="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer.gif" alt="rocket typer">
  </a>
</p>


*** 
<br>

### User profiles
When visiting a user's profile, Rocket Typer presents a plethora of statistics about that user, including signup date, number of races, average speed, and top 10 fastest races.

<p align="center">
  <a href="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_profile.png">
    <img src="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_profile.png" alt="rocket typer" width="600">
  </a>
</p>

***
<br>

### Global Leaderboard
The homepage for Rocket Typer shows the global top 10 fastest races and 10 latest races via custom SQL queries to the MongoDB database.

<p align="center">
  <a href="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_leaderboard.png">
    <img src="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_leaderboard.png" alt="rocket typer" width="700">
  </a>
</p>

```js
  router.get('/recent', (req, res) => {
      Race
          .aggregate([
                      {$match: { 
                          }
                      },
                      {$sort: {
                          "date": -1,
                          }
                      },
                      {$sort: {
                          "averageSpeed": 1,
                          }
                      },
                      {$group: { 
                              _id: "$raceId",
                              numRaces: { $sum: 1},
                              topSpeed: { $max: "$averageSpeed" },
                              date: { $last: "$date" },
                              winner: { $last: "$username" },
                          }
                      },
                      {$sort: {
                          "date": -1,
                          }
                      },
                  ])
          .limit(10)
          .then(races => res.json(races))
          .catch(err => 
              res.status(404).json({ noracesfound: 'No races found'})
          );
  });
```

***
<br>
