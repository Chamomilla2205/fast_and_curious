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
            'doctors',
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING
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
        await queryInterface.dropTable('doctors')
    }
};
