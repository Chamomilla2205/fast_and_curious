const DataTypes = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable(
            'services',
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true
                },
                speciality: {
                    type: DataTypes.STRING
                },
                doctor_id: {
                    type: DataTypes.INTEGER
                },
                clinic_id: {
                    type: DataTypes.INTEGER
                }
            }
        )
    },

    down: async (queryInterface) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('services')
    }
};
