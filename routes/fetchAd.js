const express = require('express')
const router = express.Router()
const Ad = require('../models/AdModel');

router.get('/fetchads', async (req, res) => {
    try {
        const ads = await Ad.find()
        res.status(200).json(ads)
    } catch (error) {
        return res.redirect('/')
    }
})
module.exports = router;