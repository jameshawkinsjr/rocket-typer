const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Race = require('../../models/Race');
const validateRaceInput = require('../../validation/races');


// Get saved races for a user
router.get('/user/:id', (res, req) => {
    Race.find( {user: req.params.id})
        .then(races => res.json(races))
        .catch(err => 
            res.status(404).json({ noracesfound: 'No races found for this user'}
        )
    );
});

// Get saved races by races id
router.get('/:id', (req, res) => {
    Race.findById(req.params.id)
        .then(races => res.json(races))
        .catch( err => 
            res.status(404).json({ noracesfound: 'No races found with that id'}
        )
    );
});

// Submit a new races model
// Currently behind authentication in order to save for a specific user
// If someone isn't logged in, we (probably) won't persist the races
// to the server. If we want to do that, we'd probably need an open
// route to just save any races

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const {errors, isValid} = validateRaceInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newRace = new Race({
            user: req.user.id,
            yearToRetire: req.body.yearToRetire,
            income: req.body.income,
            savingRate: req.body.savingRate,
            employerMatch: req.body.employerMatch,
            currentSavings: req.body.currentSavings
        });

        newRace.save().then(races => res.json(races));
    }
);

module.exports = router;