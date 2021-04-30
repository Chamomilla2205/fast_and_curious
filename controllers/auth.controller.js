const {errorCodes} = require('../constants');
const {authServices} = require('../services');
const {tokenizer} = require('../helpers');
const {transactionInst} = require('../dataBase/MySQL').getInit();

module.exports = {
    enterToAccount: async (req,res) => {
        const transaction = await transactionInst()
        try {
            const {profile: {id}} = req;

            const tokens = await tokenizer();

            await authServices.newToken(tokens, id);

            await transaction.commit();
            res.json(tokens)
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    takeRefresh: async (req,res) => {
        const transaction = await transactionInst()
        try {
            const {tokens: admin_id} = req;
            const tokens = tokenizer();

            await authServices.newToken(tokens, admin_id);

            await transaction.commit();
            res.json(tokens)
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
