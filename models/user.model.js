const DataTypes = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tablename: 'user',
    underscored: true,
})

module.exports = User