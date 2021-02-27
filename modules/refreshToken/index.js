const refreshTokenModel = require('./model');
const jwt = require('jsonwebtoken')

const refreshTokenHandle = {
    async createRefreshToken(refreshToken, next) {
        try {
            await refreshTokenModel.create({ content: refreshToken })
        } catch (error) {
            next(error)
        }
    },

    async setRefreshToken(req, res, next) {
        if(req.body) {
            try {
                const token = await req.body.refreshToken;
                !token && res.status(401).json('no token');
                const item = await refreshTokenModel.findOne({content: token});
                !item && res.status(403).json('no database');
                jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,(error, email) => {
                    error && res.status(403).json('verify');
                    const newAccessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.TOKEN_LIFE_TIME})
                    res.status(200).json({accessToken: newAccessToken})
                })
            } catch (error) {
                next(error)
            }
        }
    },

    async deleteRefreshToken(refreshToken, next) {
        try {
            await refreshTokenModel.deleteOne({ content: refreshToken })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = refreshTokenHandle