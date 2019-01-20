const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
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


/// PRODUCTION
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }})
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
