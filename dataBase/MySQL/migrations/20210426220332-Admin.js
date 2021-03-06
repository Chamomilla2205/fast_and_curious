const DataTypes = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable(
            'admin',
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
            }
        );
    },

    down: async (queryInterface) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('admin')
    }
};
