const DataTypes = require('sequelize')
const sequelize = require('../config/db')
const Player = require('./player.model')

const State = sequelize.define('state', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    type:{
        type:DataTypes.ENUM('S,U'),
        allowNull:false
    }
}, {
    tablename: 'state',
    underscored: true,
})

State.hasMany(Player, { foreignKey:'state_id' })

module.exports = State