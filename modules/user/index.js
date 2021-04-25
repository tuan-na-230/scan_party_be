const userModel = require('./model');
const helper = require('../../helper');
const jwt = require('jsonwebtoken');
const refreshTokenHandler = require('../refreshToken/index');
const emailHandler = require('../../email_helper');
const fileUploadHandler = require('../fileUpload');

const userHandler = {
    async signup(req, res, next) {
        if (req.body) {
            if (req.body.password === req.body.confirmPassword) {
                try {
                    const isEmailExits = await userModel.findOne({ email: req.body.email });
                    if (isEmailExits) {
                        res.status(404).json({ message: 'email_exists' })
                    }
                    else {
                        const data = { ...req.body, password: await helper.hashPassword(req.body.password) }
                        const item = await userModel.create(data);
                        await emailHandler.sendMailVerifyEmail(item)
                        res.status(200).json({ message: 'we_sended_to_you_email_confirm' });
                    }
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
    async signIn(req, res, next) {
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
                        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, user: item })
                    }
                    else {
                        res.status('404').send({ message: 'email_or_password_wrong' })
                    }
                }
                else {
                    res.status('404').send({ message: 'email_or_password_wrong' })
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
                !email && res.status(404).json({ message: 'required_email' });
                const item = await userModel.findOne({ email: email })
                !item && res.status(404).json({ message: 'not_found_email' });
                const newPassword = `Rs${Math.floor(Math.random() * (999999 - 100000) + 100000)}`
                const hashPassword = await helper.hashPassword(newPassword);
                if (item) {
                    await userModel.findByIdAndUpdate(item._id, { password: hashPassword })
                }
                await emailHandler.sendMailResetPassword(item, newPassword)
                res.status(200).json({ message: 'we_sent_an_email_with_new_password' })
            } catch (error) {
                next(error)
            }
        } else {
            res.status(401).json({ message: 'required_body' })
        }
    },

    async enableEmail(req, res, next) {
        try {
            const id = req.params.id
            !id && res.status(404).json('required_id')
            const item = await userModel.findByIdAndUpdate(id, { enable: true })
            !item && res.status(404).json('no_success')
            res.redirect('http://localhost:3000/users/sign-in')
        } catch (error) {
            next(error)
        }
    },

    async updateUser(req, res, next) {
        if (req.body) {
            try {
                const email = req.body.email;
                !email && res.status(404).json({ message: 'required_email' });
                const item = await userModel.findOneAndUpdate({ email: email }, req.body, { new: true });
                !item && res.status(404).json({ message: 'no_success' })
                res.status(200).json({ user: item, message: 'update_success' })
            } catch (error) {
                next(error)
            }
        } else {
            res.status(401).json({ message: 'required_body' })
        }
    },

    async changePassword(req, res, next) {
        if (req.body) {
            try {
                const item = await userModel.findOne({ email: req.body.email });
                !item && res.status(404).json({ message: 'email_wrong' });
                const passwordVerify = await helper.verifyPasswrod(req.body.currentPassword, item.password)
                !passwordVerify && res.status(404).json({ message: 'current_password_wrong' });
                if (req.body.newPassword === req.body.confirmPassword) {
                    await userModel.findOneAndUpdate({ email: req.body.email }, { password: await helper.hashPassword(req.body.newPassword) }, { new: true });
                    res.status(200).json({ message: 'change_password_success' });
                }
                else {
                    res.status(401).json('confirm_password_wrong !')
                }
            } catch (error) {
                next(error)
            }
        } else {
            res.status(401).json({ message: 'required_body' })
        }
    },

    async changeAvatar(req, res, next) {
        if (req.body) {
            try {
                let email = req.body.email;
                const item = await userModel.findOneAndUpdate({ email: email }, { avatar: `${process.env.DOMAIN}/uploads/images/${req.file.filename}` }, { new: true })
                !item && res.status(404).json({ message: 'email_do_not_exits' })
                fileUploadHandler.uploadNewAvatar({ filename: req.file.filename, id: item._id, type: 'image', path: `${process.env.DOMAIN}/uploads/images/${req.file.filename}` })
                res.status(200).json({ user: item, message: 'upload_avatar_success' })
            } catch (error) {
                next(error)
            }
        } else {
            res.status(401).json({ message: 'required_body' })
        }
    }
}

module.exports = userHandler;