const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const now = new Date(Date.now());    
    sequelize.define('Character', {
        code: {
            type: DataTypes.STRING(5),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER
        },
        race: {
            type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
            defaultValue: 'Other'
        },
        hp: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        mana: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date_added: {
            type: DataTypes.STRING,
            defaultValue: now.toISOString().split('T')[0]
        }
    }, {
        timestamps: false,
    })
}