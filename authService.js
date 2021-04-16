const jwt = require("jsonwebtoken");

const authService = {
    // middleware
    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        (token === null) && res.sendStatus(401).json({message: 'no_token_provided'})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            err && res.sendStatus(403).json({message: 'unauthorized'})
            req.email = data.user
            next();
        })
    },
}

module.exports = authService