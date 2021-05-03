const jwt = require('jsonwebtoken');
const {errorCodes} = require('../constants');
const {adminServices, authServices} = require('../services');
const {JWT_ACCESS, JWT_REFRESH} = require('../config/config');
module.exports = {
    checkUser: async (req,res,next) => {
        try {
            const {login, password} = req.body;

            let user = await adminServices.getOneAdmin({login});

            const pass = (password === user.password);

            if (!user || !pass) {
                throw new Error('WRONG EMAIL OR PASSWORD');
            }

            req.profile = user;
            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    checkAccessToken: async (req,res,next) => {
        try {
            const access_token = await req.get('Authorization');

            if (!access_token) {
                throw new Error('TOKEN IS REQUIRED');
            }

            jwt.verify(access_token, JWT_ACCESS, (err) => {
                if (err) {
                    res.status(errorCodes.UNAUTHORIZED).json(err.message)
                }
            })

            const token = await authServices.checkToken({access_token});
            if (!token) {
                throw new Error('TOKEN IS DEAD')
            }

            next()
        } catch (error) {
            res.status(errorCodes.UNAUTHORIZED).json(error.message)
        }
    },

    checkRefreshToken: async (req,res,next) => {
        try {
            const refresh_token = await req.get('Authorization');
            if (!refresh_token) {
                throw new Error('TOKEN IS REQUIRED')
            }

            jwt.verify(refresh_token, JWT_REFRESH, (err) => {
                if (err) {
                    res.status(errorCodes.UNAUTHORIZED).json(err.message)
                }
            })

            const token = await authServices.checkToken({refresh_token});
            if (!token) {
                throw new Error('TOKEN IS DEAD')
            }

            req.tokens = refresh_token;
            next()
        } catch (error) {
            res.status().json()
        }
    }
}
