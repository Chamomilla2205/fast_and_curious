const DataTypes = require('sequelize');
module.exports = (client) => {
    const DoctorServices = client.define(
        'doctors-services',
        {
            doctor_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            service_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }
        },
        {
            tableName: 'doctors-services',
            timestamps: false
        }
    );
    return DoctorServices;
}

