const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');

router.get('/', (req, res) => {
    res.send('Hello')
})

router.post('/', cors(), (req, res) => {
    if (req.body.user === 'admin' && req.body.password === '12345') {
        const payload = {
            check: true
        }
        const token = jwt.sign(payload, 'claveJWT', {
            expiresIn: '7d'
        })
        res.json({
            message: 'Succesfully',
            token: token
        })
    } else {
        const payload = {
            check: true
        }
        const token = jwt.sign(payload, 'claveJWT', {
            expiresIn: '7d'
        })
        res.json({
            message: 'Succesfully',
            token: token
        })
    }
})

module.exports = router;