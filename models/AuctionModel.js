import UserModel from "./UserModel";

export default (sequelize, type) => {
    return sequelize.define('auction', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        price: {
            type: type.DECIMAL(10,2),
            allowNull: false
        },
        endDate: {
            type: type.DATE,
            allowNull: false,
        },
        isActive: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        description: {
            type: type.TEXT,
        },
        images: {
            type: type.ARRAY(type.TEXT)
        },
        viewsCount: {
            type: type.INTEGER,
            defaultValue: 0
        },
    })
}