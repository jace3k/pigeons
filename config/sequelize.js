const Sequelize = require('sequelize');
const UserModel =  require('../models/UserModel');
const AuctionModel = require('../models/AuctionModel');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

const User = UserModel(sequelize, Sequelize);
const Auction = AuctionModel(sequelize, Sequelize);

// RELATIONS
Auction.belongsTo(User, {
    foreignKey: {
        name: 'owner_id',
        allowNull: false
    }
});

sequelize.sync()
    .then(() => {
        console.log('Tables has been created.');
    })
    .catch(err => {
        console.log('Something went wrong.', err);
    });

module.exports = {
    User,
    Auction,
};
