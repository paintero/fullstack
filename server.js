/* If this is not production then load the environment
   variables from the .env file */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

/* express setup */
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

/* routes */
const indexRouter = require('./routes/index')

/* express setup */
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

/* mongo db connection */
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

/* link url paths to routes */
app.use('/', indexRouter)

/* and off we go */
app.listen(process.env.PORT || 3000)