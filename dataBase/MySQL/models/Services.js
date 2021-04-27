const DataTypes = require('sequelize');

module.exports = (client) => {
    const Services = client.define(
        'Services',
        {
            id: {
                type: DataTypes.STRING,
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
