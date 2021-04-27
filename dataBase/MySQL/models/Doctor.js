const DataTypes = require('sequelize');
module.exports = (client) => {
    const Doctor = client.define(
        'doctors',
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
            tableName: 'doctors',
            timestamps: false
        }
    );
    return Doctor;
}

