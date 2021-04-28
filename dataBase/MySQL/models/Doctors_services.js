const DataTypes = require('sequelize');
module.exports = (client) => {
    const DoctorServices = client.define(
        'doctors_services',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            doctor_id: {
                type: DataTypes.INTEGER
            },
            service_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'doctors_services',
            timestamps: false
        }
    );
    return DoctorServices;
}

