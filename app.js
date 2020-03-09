var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var mongo_connect = require('./utilities/mongo_connector')

var pharmaRouter = require('./routes/pharmacy/medicines')
var batchRouter = require('./routes/pharmacy/batches')
var relationsRouter = require('./routes/pharmacy/medicine_batch')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/pharmacy', pharmaRouter)
app.use('/pharmacy', batchRouter)
app.use('/pharmacy', relationsRouter)

module.exports = app;