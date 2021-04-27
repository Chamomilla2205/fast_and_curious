const DataTypes = require('sequelize')

module.exports = (client) => {
    const Clinic = client.define(
        'clinic',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'clinic',
            timestamps: false
        }
    );
    return Clinic;
}
