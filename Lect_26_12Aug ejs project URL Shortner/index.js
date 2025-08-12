const express = require('express')
const dotenv=require('dotenv')
const upload = require('./multer')
const Url = require('./models/Url')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const { nanoid } = require('nanoid')

dotenv.config()


mongoose.connect('mongodb://127.0.0.1:27017/urlShortener');

const PORT=process.env.PORT
const app=express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',async(req,res)=>{
    const urls=await Url.find().lean()
    res.render('index',{urls,req})
})

app.post('/shorturl',upload.single('picture'),async (req,res)=>{
    const {originalUrl}=req.body
    const pictureUrl=req.file.path
    const publicId=req.file.filename

    const shortUrl=nanoid(6)

    await Url.create({
        originalUrl,publicId,pictureUrl,shortUrl
    })
    res.redirect('/')

})


app.listen(PORT, ()=>{
    console.log('server is running on ',PORT)
})