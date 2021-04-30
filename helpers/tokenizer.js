const jwt = require('jsonwebtoken');

const {JWT_ACCESS, JWT_REFRESH} = require('../config/config');

module.exports = () => {
    const access_token = jwt.sign({}, JWT_ACCESS, {expiresIn: '1hour'});
    const refresh_token = jwt.sign({}, JWT_REFRESH, {expiresIn: '30d'});

    return {
        access_token,
        refresh_token
    }
}
