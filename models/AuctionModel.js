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
    startPrice: {
      type: type.DECIMAL(10, 2),
      allowNull: false,
    },
    currentPrice: {
      type: type.DECIMAL(10, 2),
      allowNull: false,
    },
    currentWinner: {
      type: type.TEXT,
      allowNull: true,
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
    ring: {
      type: type.TEXT,
      allowNull: false,
    },
    sex: {
      type: type.TEXT,
      allowNull: false,
    },
    race: {
      type: type.TEXT,
      allowNull: false,
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
};