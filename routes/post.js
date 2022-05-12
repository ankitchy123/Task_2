const express = require('express')
const router = express.Router()
const multer = require('multer');
const Post = require('../models/PostModel');

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage: Storage
}).single('image')

router.post('/upload', (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                req.flash("error", "Something went wrong")
                return res.redirect('/')
            }

            const newPost = new Post({
                title: req.body.title,
                description: req.body.description,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })

            newPost.save()
            req.flash("success", "Ad Created")
            return res.redirect('/')
        })
    } catch (error) {
        req.flash("error", "Internal server error")
        return res.redirect('/')
    }
})
module.exports = router;