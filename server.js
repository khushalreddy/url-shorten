const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')

const dotenv = require("dotenv");

dotenv.config();
const IndexRouter = require('./routes/index')

app.set('view engine','ejs')

//app.set('views',__dirname +'/views')

//app.set('layout','layouts/layout')

//app.use(expressLayouts)

//app.use(express.static('public'))

app.listen(process.env.PORT || 5000)

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
})
const db = mongoose.connection

db.on('error',error => console.error(error))

db.once('open',()=> console.log('Connected to Mongoose'))
//app.use('/',IndexRouter);

app.use(express.urlencoded({extended:false}))

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
  })
  
  app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
  
    res.redirect('/')
  })
  
  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })