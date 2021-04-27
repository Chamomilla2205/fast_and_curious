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
            'O_Auth',
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true
                },
                access_token: {
                    type: DataTypes.STRING
                },
                refresh_token: {
                    type: DataTypes.STRING
                },
                admin_id: {
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
        await queryInterface.dropTable('O_Auth')
    }
};
