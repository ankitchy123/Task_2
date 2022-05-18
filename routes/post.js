const express = require('express')
const router = express.Router()
const multer = require('multer');
const Ad = require('../models/AdModel');

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

const upload = multer({
    storage: Storage
}).single('image')

router.post('/upload', upload, (req, res) => {
    try {
        // upload(req, res, (err) => {
        //     if (err) {
        //         req.flash("error", "Something went wrong")
        //         return res.redirect('/')
        //     }

        //     const newAd = new Ad({
        //         title: req.body.title,
        //         description: req.body.description,
        //         image: {
        //             data: req.file.filename,
        //             contentType: 'image/png'
        //         }
        //     })

        //     newAd.save()
        //     req.flash("success", "Ad Created")
        //     return res.redirect('/')
        // })

        const newAd = new Ad({
            title: req.body.title,
            description: req.body.description,
            image: req.file.filename
        })
        newAd.save()
        req.flash("success", "Ad Created")
        return res.redirect('/')
    } catch (error) {
        req.flash("error", "Internal server error")
        return res.redirect('/')
    }
})
module.exports = router;