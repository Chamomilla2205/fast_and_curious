const DataTypes = require('sequelize');

module.exports = (client) => {
    const Services = client.define(
        'Services',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            speciality: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'services',
            timestamps: false
        }
    );
    return Services;
}
