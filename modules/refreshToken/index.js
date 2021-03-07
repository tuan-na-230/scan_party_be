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
                !token && res.status(401).json({message: 'require_refresh_token'});
                const item = await refreshTokenModel.findOne({content: token});
                !item && res.status(403).json({message: 'refresh_token_do_not_exist'});
                jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,(error, email) => {
                    error && res.status(403).json({message: 'verify'});
                    const newAccessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.TOKEN_LIFE_TIME})
                    res.status(200).json({accessToken: newAccessToken})
                })
            } catch (error) {
                next(error)
            }
        }
    },

    async deleteRefreshToken(req, res, next) {
        if(req.body) {
            try {
                await refreshTokenModel.deleteOne({ content: req.body.refreshToken });
            } catch (error) {
                next(error)
            }
        } else {
            res.status(404).json({message: 'require_body'})
        }
    }
}

module.exports = refreshTokenHandle