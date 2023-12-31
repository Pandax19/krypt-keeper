const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Event extends Model {}

Event.init(

  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE
    },
    price: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      
    },

    street: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.STRING
    },
    longitude: {
      type: DataTypes.STRING
    },


  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "event"
  }
)

module.exports = Event


