require('dotenv').config();
require('./connect-mongodb')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routers = require('./routers')


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors)
app.use(bodyParser.json())
app.use(routers)

app.listen(PORT, (err) => {
    err
        ? console.error(err.message)
        : console.log(`Server listening on port: ${PORT}`);
});