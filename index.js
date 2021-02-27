require('dotenv').config();
require('./connect-mongodb')
const express = require('express');
const bodyParser = require('body-parser');
const authService = require('./authService');
// const hbs = require('nodemailer-handlebars');
// const cors = require('cors');
const expbs = require('express-handlebars')

const routers = require('./routers/index')


const PORT = process.env.PORT || 4000;
const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.use(cors)
app.use(bodyParser.json())
// Add headers

// app.engine('handlebars', expbs());
// app.set('view engine', 'handlebars')

app.use('/api/v1/user', authService.authenticateToken);

app.use(routers)

app.use((err, req, res, next) => {
    res.status(500)
        .json({
            message: err.message,
            stack: err.stack
        })
})

app.listen(PORT, (err) => {
    err
        ? console.error(err.message)
        : console.log(`Server listening on port: ${PORT}`);
});