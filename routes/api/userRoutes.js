const express = require('express');
const router = express.Router();
const {User, Auction} = require('../../config/sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/test',
  (req, res) => res.json({msg: "Users WORKS xDDDs!"}));


router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findAndCountAll({include: [{model: User, as: 'likes'}]}).then(users => res.json(users));
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

router.get('/profile/:name', (req, res) => {
  User.find({where: {name: req.params.name}})
    .then(user => {
      if (user) {
        return res.json({
          id: user.id,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          telephone: user.telephone,
          address: user.address,
          date: user.date,
          likes: user.likes,
          dislikes: user.dislikes,
        })
      } else {
        return res.status(400).json({user: "nie znaleziono"})
      }
    })
});

router.post('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({where: {email: req.body.email}}).then(user => {
    if (user) {
      errors.email = 'Adres email jest już zajęty';
      return res.status(400).json(errors);
    } else {
      User.findOne({where: {name: req.body.name}}).then(user => {
        if (user) {
          errors.name = 'Nazwa jest już zajęta';
          return res.status(400).json(errors);
        } else {
          // const newUser = {
          //   firstName: req.body.firstName,
          //   lastName: req.body.lastName,
          //   name: req.body.name,
          //   email: req.body.email,
          //   password: req.body.password,
          //   telephone: req.body.telephone,
          //   address: req.body.address,
          // };
          const newUser = Object.assign({}, req.body);

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              User.create(newUser).then(user => res.json({
                id: user.id,
                name: user.name,
                email: user.email,
              }))
                .catch(err => console.log(err));
            })
          })
        }
      });
    }
  });
});


router.post('/login', (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const name = req.body.name;
  const password = req.body.password;

  // Find user by email
  User.findOne({where: {name}})
    .then(user => {
      // check for user
      if (!user) {
        errors.name = 'Nie znaleziono takiego użytkownika';
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
            errors.password = 'Złe hasło';
            res.status(400).json(errors);
          }
        })
    })
});


router.get('/like/:name', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findOne({
    where: {
      name: req.params.name
    }
  })
    .then((user => {
      if (user) {
        if (user.likes.filter(id => id === req.user.id).length > 0) {
          user.likes = user.likes.filter(id => id !== req.user.id);
          user.update({likes: user.likes});
          user.save();
          return res.json({like: -1, user})
        } else {
          user.likes.push(req.user.id);
          user.update({likes: user.likes});
          user.save();
          return res.json({like: 1, user})
        }
      } else {
        return res.status(400).json({like: "nie ma takiego użytkownika"})
      }
    }))
});


router.get('/dislike/:name', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findOne({
    where: {
      name: req.params.name
    }
  })
    .then((user => {
      if (user) {
        if (user.dislikes.filter(id => id === req.user.id).length > 0) {
          user.dislikes = user.dislikes.filter(id => id !== req.user.id);
          user.update({dislikes: user.dislikes});
          user.save();
          return res.json({dislike: -1, user})
        } else {
          user.dislikes.push(req.user.id);
          user.update({dislikes: user.dislikes});
          user.save();
          return res.json({dislike: 1, user})
        }
      } else {
        return res.status(400).json({dislike: "nie ma takiego użytkownika"})
      }
    }))
});


module.exports = router;