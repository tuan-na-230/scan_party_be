const express = require('express');
const router = new express.Router();
const authService = require('../../authService')

const refreshTokenHandler = require('../../modules/refreshToken/index')
const userHandler = require('../../modules/user/index');

router.post('/api/v1/auth', userHandler.signup)

router.post('/api/v1/signin', userHandler.signin)

router.post('/api/v1/refresh-token', refreshTokenHandler.setRefreshToken)

router.get('/api/v1/users/verify-email/:id', userHandler.enableEmail)

router.post('/api/v1/users/password/new', userHandler.restPassword)

router.get('/api/v1/user/1', (req, res) => {
    res.send(req.email)
})

router.get('')

module.exports = router;