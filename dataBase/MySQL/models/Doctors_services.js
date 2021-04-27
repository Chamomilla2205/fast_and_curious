const DataTypes = require('sequelize');
module.exports = (client) => {
    const DoctorServices = client.define(
        'doctors-services',
        {
            doctor_id: {
                type: DataTypes.INTEGER
            },
            service_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'doctors-services',
            timestamps: false
        }
    );
    return DoctorServices;
}

