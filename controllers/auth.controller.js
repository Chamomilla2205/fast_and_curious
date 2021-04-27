const {errorCodes} = require('../constants')

module.exports = {
    enterToAccount: async (req,res) => {
        try {
            const {email, password} = req.body;

        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
