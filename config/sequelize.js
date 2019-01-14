import Sequelize from 'sequelize';
import UserModel from '../models/UserModel';
import AuctionModel from '../models/AuctionModel';

const sequelize = new Sequelize('pigeons', 'piggy', '1234qaz', {
    dialect: 'postgres'
});

const User = UserModel(sequelize, Sequelize);
const Auction = AuctionModel(sequelize, Sequelize);

// User.hasMany(Auction, {as: 'auctions'});
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
