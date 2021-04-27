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
    await queryInterface.dropTable('doctor-in-clinic')
  }
};
