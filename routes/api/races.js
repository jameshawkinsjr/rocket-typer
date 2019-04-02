const express = require('express');
const router = express.Router();
const passport = require('passport');

const Race = require('../../models/Race');
const validateRaceInput = require('../../validation/races');

router.get('/', (req, res) => {
    Race.find()
        .then(races => res.json(races))
        .catch(err => 
            res.status(404).json({ noracesfound: 'No races found'})
        );
});

router.get('/user/:userid', (req, res) => {
    Race.
    find( { 
        user: req.params.userid
    }).
    limit(10).
    sort({averageSpeed: -1}).
    then(races => res.json(races))
    .catch(err => 
            res.status(404).json({ noracesfound: 'No races found for this user'})
        );
});

router.get('/:id', (req, res) => {
    Race.findById(req.params.id)
        .then(races => res.json(races))
        .catch( err => 
            res.status(404).json({ noracesfound: 'No races found with that id'})
        );
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
        const {errors, isValid} = validateRaceInput(req.body);

        if (!isValid) return res.status(400).json(errors);

        const newRace = new Race({
            user: req.user.id,
            averageSpeed: parseInt(req.body.averageSpeed),
        });

        newRace.save().then(races => res.json(races));
    }
);

module.exports = router;