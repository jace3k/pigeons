import Sequelize from 'sequelize';
import UserModel from '../models/UserModel';
import AuctionModel from '../models/AuctionModel';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres'
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
