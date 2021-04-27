const DataTypes = require('sequelize');
module.exports = (client) => {
    const DoctorInClinic = client.define(
        'doctor-in-clinic',
        {
            doctor_id: {
                type: DataTypes.INTEGER
            },
            clinic_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'doctors',
            timestamps: false
        }
    );
    return DoctorInClinic;
}

