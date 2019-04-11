const express = require('express');
const router = express.Router();
const passport = require('passport');

const Race = require('../../models/Race');
const validateRaceInput = require('../../validation/races');

router.get('/top10', (req, res) => {
    Race
        .find( {} )
        .limit(10)
        .sort({averageSpeed: -1})
        .then(races => res.json(races))
        .catch(err => 
            res.status(404).json({ noracesfound: 'No races found'})
        );
});

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

router.get('/user/:username/stats', (req, res) => {
    Race
        .aggregate([
                    {$match: {
                            'username': req.params.username
                        }
                    },
                    {$group: { 
                            _id: "$username",
                            avgSpeed: { $avg: "$averageSpeed" },
                            numRaces: { $sum: 1},
                            maxSpeed: { $max: "$averageSpeed" },
                        }
                    },
        ])
        .then( userStats => res.status(200).json(userStats))
        .catch(err => res.status(404).json({ noracesfound: 'No stats'}));
});

router.get('/user/:username', (req, res) => {
    Race
    .find( { username: req.params.username})
    .limit(10)
    .sort({averageSpeed: -1})
    .then(races => res.json(races))
    .catch(err => 
            res.status(404).json({ noracesfound: 'No races found for this user'})
        );
});

router.get('/:id', (req, res) => {
    Race
    .find( { 'raceId': req.params.id})
    .sort({averageSpeed: -1})
    .then( users => res.status(200).json(users))
    .catch(err => res.status(404).json({ noRaces: 'No races found with that ID'}));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
        const {errors, isValid} = validateRaceInput(req.body);

        if (!isValid) return res.status(400).json(errors);

        const newRace = new Race({
            raceId: req.body.gameId,
            user: req.user.id,
            username: req.body.username,
            averageSpeed: parseInt(req.body.averageSpeed),
            accuracy: parseInt(req.body.accuracy),
        });

        newRace.save().then(races => res.json(races));
    }
);

module.exports = router;