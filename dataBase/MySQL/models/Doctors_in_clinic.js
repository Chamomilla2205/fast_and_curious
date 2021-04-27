const DataTypes = require('sequelize');
module.exports = (client) => {
    const DoctorInClinic = client.define(
        'doctor-in-clinic',
        {
            doctor_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            clinic_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }
        },
        {
            tableName: 'doctors',
            timestamps: false
        }
    );
    return DoctorInClinic;
}

