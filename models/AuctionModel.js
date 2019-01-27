module.exports = (sequelize, type) => {
    return sequelize.define('auction', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: type.TEXT,
            allowNull: false,
        },
        price: {
            type: type.DECIMAL(10,2),
            allowNull: false,
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
    }, {
        instanceMethods: {
            toJSON: () => {
                const values = Object.assign({}, this.get());
                if (this.UserModel) {
                    values.user = this.UserModel;
                }
                return values;
            }
        }
    })
}