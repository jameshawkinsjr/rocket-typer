<p align="center">
  <a href="https://www.rockettyper.com/">
    <img src="https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_logo.png" alt="rocket typer logo" width="400">
  </a>
</p>

View our [live site](https://www.rockettyper.com/)

# Rocket Typer
Rocket Typer was designed to test your typing speed and see how you stack up against other users. It was build using the following technologies: 
* <strong>Backend</strong>: Node.js with a MongoDB database
* <strong>Frontend</strong>: React.js with Redux, socket.io
* <strong>Misc</strong>: SCSS, Express.js, Heroku

*** 
# Features 
* [Test your typing speed](https://github.com/jameshawkinsjr/rocket-typer#speed-test)
* [Viewing a user's stats](https://github.com/jameshawkinsjr/rocket-typer#user-profiles)
* [View the global leaderboard](https://github.com/jameshawkinsjr/rocket-typer#global-leaderboard)


<br>

### Speed Test
Utilizing keypress event listeners and React's local state, Rocket Typer is able to keep track of correctly typed letters, while calculating words per minute, and accuracy. Upon completion of the given phrase, an API call automatically saves the race, so that it can be posted to the global leaderboard and the user's profile page will reflect the most recent stats.

Utilizing React, we're able the user's progress in the game as local state to other components which allow for rendering of the rocket's trip from Earth to Mars.

![Speed Test](https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket-typer.gif)

*** 
<br>

### User profiles
When visiting a user's profile, Rocket Typer presents a plethora of statistics about that user, including signup date, number of races, average speed, and top 10 fastest races.

![Rocket Typer User Profile](https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_profile.png)

***
<br>

### Global Leaderboard
The homepage for Rocket Typer shows the global top 10 fastest races via a SQL query to the MongoDB database.

![Viewing Projections](https://github.com/jameshawkinsjr/rocket-typer/blob/master/frontend/public/assets/rocket_typer_profile.png)
***
<br>