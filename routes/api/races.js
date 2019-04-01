const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Race = require('../../models/Race');
const validateRaceInput = require('../../validation/races');

router.get('/user/:id', (res, req) => {
    Race.find( {user: req.params.id})
        .then(races => res.json(races))
        .catch(err => 
            res.status(404).json({ noracesfound: 'No races found for this user'}
        )
    );
});

router.get('/:id', (req, res) => {
    Race.findById(req.params.id)
        .then(races => res.json(races))
        .catch( err => 
            res.status(404).json({ noracesfound: 'No races found with that id'}
        )
    );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateRaceInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newRace = new Race({
            user: req.user.id,
            averageSpeed: req.body.averageSpeed,
        });

        newRace.save().then(races => res.json(races));
    }
);

module.exports = router;