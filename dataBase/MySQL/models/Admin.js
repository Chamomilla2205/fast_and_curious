const DataTypes = require('sequelize');

module.exports = (client) => {
    const Admin = client.define(
        'Admin',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            login: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'admin',
            timestamps: false
        }
    );
    return Admin;
}
