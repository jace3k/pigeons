const express = require('express');
const router = express.Router();
const {User} = require('../../config/sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/test',
    (req, res) => res.json({msg: "Users WORKS xDDDs!"}));


router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findAndCountAll().then(users => res.json(users));
});

router.get(
    '/current',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    });


router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({where: {email: req.body.email}}).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    User.create(newUser).then(user => res.json({user}))
                        .catch(err => console.log(err));
                })
            })
        }
    })
});


router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({where: {email}})
        .then(user => {
            // check for user
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User mached
                        const payload = {id: user.id, name: user.name, avatar: user.avatar};

                        // Sign token
                        jwt.sign(payload, keys.secret, {expiresIn: 3600}, (err, token) => {
                            return res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });

                    } else {
                        errors.password = 'Password incorrect';
                        res.json(errors);
                    }
                })
        })
});


module.exports = router;