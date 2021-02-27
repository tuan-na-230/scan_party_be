const userModel = require('./model');
const helper = require('../../helper');
const jwt = require('jsonwebtoken');
const refreshTokenHandler = require('../refreshToken/index');
const emailHandler = require('../../email_helper');

const userHandler = {
    async signup(req, res, next) {
        if (req.body) {
            if (req.body.password === req.body.confirmPassword) {
                try {
                    const name = req.body.firstName + req.body.lastName;
                    const email = req.body.email;
                    const password = await helper.hashPassword(req.body.password)
                    const data = { name, email, password }
                    const item = await userModel.create(data);
                    await emailHandler.sendMailVerifyEmail(item)
                    res.status(200).json({ email: 'we sended to you email confirm !' });
                } catch (error) {
                    next(error)
                }
            } else {
                res.status(401).json('confirm_password_wrong !')
            }
        } else {
            res.status(401).json('required_body')
        }
    },
    async signin(req, res, next) {
        if (req.body) {
            try {
                const data = req.body;
                let item = await userModel.findOne({ email: data.email });
                if (item && item.enable === true) {
                    const passwordVerify = await helper.verifyPasswrod(req.body.password, item.password)
                    if (passwordVerify) {
                        const accessToken = await jwt.sign({ user: item.email }, process.env.ACCESS_TOKEN_SECRET)
                        const refreshToken = await jwt.sign({ user: item.email }, process.env.REFRESH_TOKEN_SECRET)
                        refreshTokenHandler.createRefreshToken(refreshToken, next)
                        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken })
                    }
                    else {
                        res.status('404').send('email or passwod wrong 1')
                    }
                }
                else {
                    res.status('404').send('email or passwod wrong 1')
                }
            } catch (error) {
                next(error)
            }
        } else {
            res.status(401).json('required_body')
        }
    },

    async signOut(req, res, next) {
        if (req.body) {
            try {
                const data = req.body;
                const refreshToken = data.refreshToken;
                await refreshTokenHandler.deleteRefreshToken(refreshToken, next)
            } catch (error) {
                next(error)
            }
        } else {
            res.status(401).json('required_body')
        }
    },

    async restPassword(req, res, next) {
        if (req.body) {
            try {
                const email = req.body.email;
                !email && res.status(404).json('required');
                const item = userHandler.findOne({ email: email })
                !item && res.status(404).json('not_found');
                res.status(200).json({email: item})
            } catch (error) {
                next(error)
            }
        } else {
            res.status(401).json('required_body')
        }
    },

    async enableEmail(req, res, next) {
        try {
            const id = req.params.id
            console.log(id)
            !id && res.status(404).json('required id')
            const item = await userModel.findOneAndUpdate({ _id: id }, { enable: true })
            !item && res.status(401).json('no_success')
            res.redirect('http://localhost:3000/users/sign-in')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = userHandler;