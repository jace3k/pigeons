const express = require('express');
const router = express.Router();
const {User, Auction} = require('../../config/sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateAuctionInput = require('../../validation/auction');
const validateBidInput = require('../../validation/bid');

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validateAuctionInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const endDate = Date.now() + 1000 * 60 * 60 * 24 * req.body.endDate;
  const newAuction = {
    // title: req.body.title,
    description: req.body.description,
    ring: req.body.ring,
    startPrice: req.body.price,
    currentPrice: req.body.price,
    endDate: endDate,
    sex: req.body.sex,
    race: req.body.race,
    isActive: endDate - Date.now() > 0,
    images: [],                            // images implemented in future
    owner_id: req.user.id,
  };

  Auction.create(newAuction)
    .then(auction => {
      User.findById(auction.owner_id).then(user => {
        return res.json({
          id: auction.id,
          viewsCount: auction.viewsCount,
          // title: auction.title,
          title: 'default_title',
          startPrice: auction.startPrice,
          currentPrice: auction.currentPrice,
          currentWinner: auction.currentWinner,
          endDate: auction.endDate,
          isActive: auction.isActive,
          description: auction.description,
          images: auction.images,
          owner: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      });
    })
});

router.get('/', (req, res) => {
  Auction.findAndCountAll({
    include: [{
      model: User, attributes: ['name']
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(auctions => {
      return res.json(auctions)
    })
});

router.get('/:id', (req, res) => {
  Auction.findById(req.params.id)
    .then(auction => {
      if (auction) {
        User.findById(auction.owner_id).then(user => {
          auction.viewsCount++;
          auction.save();
          let response = {
            id: auction.id,
            viewsCount: auction.viewsCount,
            // title: auction.title,
            startPrice: auction.startPrice,
            currentPrice: auction.currentPrice,
            currentWinner: auction.currentWinner,
            endDate: auction.endDate,
            isActive: auction.isActive,
            description: auction.description,
            ring: auction.ring,
            race: auction.race,
            sex: auction.sex,
            images: auction.images,
            owner: {
              id: user.id,
              name: user.name,
              email: user.email,
              telephone: user.telephone,
              likes: user.likes.length,
              dislikes: user.dislikes.length,
            },
          };
          return res.json(response);
        });
      } else {
        return res.status(400).json({auction: 'Nie znaleziono aukcji'})
      }
    });
});


router.post('/bid/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = validateBidInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const auctionId = req.params.id;
  const username = req.user.name;
  const userId = req.user.id;
  const bid = Number(req.body.bid);

  Auction.findById(auctionId).then(auction => {
    if (!auction) {
      return res.status(400).json({
        bid: 'Nie znaleziono aukcji',
        currentPrice: auction.currentPrice,
        currentWinner: auction.currentWinner,
      })
    }

    if (auction.owner_id === userId) {
      return res.status(401).json({
        bid: 'To twoja aukcja',
        currentPrice: auction.currentPrice,
        currentWinner: auction.currentWinner,
      })
    }

    const difference = bid - auction.currentPrice;

    if (auction.currentPrice >= bid || difference < 10) {
      return res.status(400).json({
        bid: 'Minimalne podbicie: 10zł',
        currentPrice: auction.currentPrice,
        currentWinner: auction.currentWinner,
        yourBid: bid,
      })
    }

    auction.currentPrice = bid;
    auction.currentWinner = username;
    auction.save();

    return res.json({
      bid: 'Podbiłeś aukcję pomyślnie',
      currentPrice: auction.currentPrice,
      currentWinner: auction.currentWinner,
    })
  })
});

router.get('/deactivate/:id', (req, res) => {
  Auction.findById(req.params.id)
    .then(auction => {
      if (auction) {
        if (!auction.isActive) {
          return res.json({auction: 'Aukcja nieaktywna'});
        } else {
          auction.isActive = false;
          auction.save();
          return res.json(auction);
        }
      } else {
        return res.status(400).json({auction: 'Nie znaleziono aukcji'});
      }
    })
});
module.exports = router;