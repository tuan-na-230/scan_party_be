const express = require('express');
const router = new express.Router();
const multer = require('multer')
const authService = require('../../authService')

const refreshTokenHandler = require('../../modules/refreshToken/index')
const userHandler = require('../../modules/user/index');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        // console.log(new Date().toISOString() + '_' + file.originalname)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

router.post('/api/v1/auth', userHandler.signup)

router.post('/api/v1/signIn', userHandler.signIn)

router.post('/api/v1/refresh-token', refreshTokenHandler.setRefreshToken);

router.post('/api/v1/sign-out', refreshTokenHandler.deleteRefreshToken)

router.get('/api/v1/users/verify-email/:id', userHandler.enableEmail)

router.post('/api/v1/users/password/new', userHandler.restPassword)

router.post('/api/v1/users/update-user', userHandler.updateUser);

router.post('/api/v1/users/change-password', userHandler.changePassword);

// save 
router.post('/api/v1/users/change-avatar', upload.single('image'),  userHandler.changeAvatar)

router.get('/api/v1/user/1', (req, res) => {
    res.send(req.email)
})

router.get('')

module.exports = router;