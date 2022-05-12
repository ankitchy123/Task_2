const connectToMongo = require('./db');
const express = require('express');
const app = express()
var cors = require('cors')
const flash = require('connect-flash');

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Middleware
app.set('view engine', 'ejs')
app.use(require("express-session")({
    secret: "The milk would do that",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.message = req.flash();
    next();
});


// connect with database
connectToMongo();

app.get('/', async (req, res) => {
    return res.render('dashboard')
})
app.get('/post', async (req, res) => {
    return res.render('postAd')
})

app.use('/api', require('./routes/post'));

app.listen(port, () => {
    console.log(`App is listening on port http://localhost:${port}`);
})