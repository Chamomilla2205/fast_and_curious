const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPassEqual = await bcrypt.compare(password, hashPassword);

        if (!isPassEqual) {
            throw new Error('WRONG EMAIL OR PASSWORD')
        }
    }
};
