const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    res.send('hello from scan party!')
})

module.exports = router;