const DataTypes = require('sequelize')
const sequelize = require('../config/db')

const Player = sequelize.define('player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.ENUM('Mr,Ms,Mrs'),
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    middle_name: DataTypes.STRING(50),
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    address_line_1: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    address_line_2: DataTypes.STRING(255),
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    state_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    mobile_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    profile_pic: DataTypes.STRING(255),
    id_proof: DataTypes.STRING(255),
    address_proof: DataTypes.STRING(255),
    form_pic: DataTypes.STRING(255),
    is_approved: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0
    },
    registered_by:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
}, {
    tablename: 'player',
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
})

module.exports = Player