module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        firstName: {
            type: type.STRING,
            allowNull: false,
        },
        lastName: {
            type: type.STRING,
            allowNull: false,
        },
        email: {
            type: type.STRING,
            allowNull: false,
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
        telephone: {
            type: type.STRING,
        },
        address: {
            type: type.STRING,
        },
        date: {
            type: type.DATE,
            defaultValue: type.NOW
        },
        likes: {
            type: type.ARRAY(type.INTEGER),
            defaultValue: [],
        },
        dislikes: {
            type: type.ARRAY(type.INTEGER),
            defaultValue: [],
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
};