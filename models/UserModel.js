module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
        },
        email: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        date: {
            type: type.DATE,
            defaultValue: type.NOW
        }
    }, {
        instanceMethods: {
            toJSON: () => {
                const values = Object.assign({}, this.get());
                delete values.password;
                return values
            }
        }
    })
}