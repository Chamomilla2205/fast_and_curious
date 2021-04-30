const DataTypes = require('sequelize');

module.exports = (client) => {
    const O_Auth = client.define(
        'O_Auth',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            access_token: {
                type: DataTypes.STRING
            },
            refresh_token: {
                type: DataTypes.STRING
            },
            admin_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'O_Auth',
            timestamps: false
        }
    );
    return O_Auth;
}
