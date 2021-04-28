const DataTypes = require('sequelize');
module.exports = (client) => {
    const DoctorInClinic = client.define(
        'doctors_in_clinic',
        {
            doctor_id: {
                type: DataTypes.INTEGER
            },
            clinic_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'Doctors_in_clinic',
            timestamps: false
        }
    );
    return DoctorInClinic;
}

