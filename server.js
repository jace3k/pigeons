require('babel-register')({
    presets: [ 'env' ]
});
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

const UserRoutes = require('./routes/api/userRoutes');
const AuctionRoutes = require('./routes/api/auctionRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);


// ROUTES
app.use('/api/users', UserRoutes);
app.use('/api/auctions', AuctionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
