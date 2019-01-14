const express = require('express');
const router = express.Router();
const {User, Auction} = require('../../config/sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    const endDate = Date.now() + 1000 * 60 * 60 * 24;
    const newAuction = {
        price: req.body.price,
        // endDate: req.body.endDate,          // endDate is ending date in ms.
        endDate: endDate,
        isActive: endDate - Date.now() > 0,
        description: req.body.description,
        images: [],                         // images implemented in future
        owner_id: req.user.id,
    };

    Auction.create(newAuction)
        .then(auction => {
            return res.json(auction);
        })

});

module.exports = router;