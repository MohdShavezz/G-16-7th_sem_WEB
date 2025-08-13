const express = require('express')
const dotenv=require('dotenv')
const upload = require('./multer')
const Url = require('./models/Url')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const { nanoid } = require('nanoid')
const cloudinary= require('./cloudinary.js')

dotenv.config()


mongoose.connect('mongodb://127.0.0.1:27017/urlShortener');

const PORT=process.env.PORT
const app=express()
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))

app.get('/',async(req,res)=>{
    const urls=await Url.find().lean()
    res.render('index',{urls,req})
})

app.post('/shorturl',upload.single('picture'),async (req,res)=>{
    const {originalUrl}=req.body

    // let publicId=null
    // let pictureUrl=null
    // if(req.file){
    //     publicId=req.file.filename
    //     pictureUrl=req.file.path
    // }

    const pictureUrl=req?.file?.path
    const publicId=req?.file?.filename

    const shortUrl=nanoid(6)

    await Url.create({
        originalUrl,publicId,pictureUrl,shortUrl
    })
    res.redirect('/')

})

//visit count increament
app.get('/:shortUrl',async(req,res)=>{
    const url= await Url.findOne({shortUrl:req.params.shortUrl})
    console.log(url)
    if(!url){
        res.json('short url not found!')
    }
    url.visitCount++
    await url.save()
    res.redirect(url.originalUrl)
})


//deletion
app.post('/:id',async(req,res)=>{
    const url= await Url.findById(req.params.id)
    console.log(url)
    if(url.publicId) {
        await cloudinary.uploader.destroy(url.publicId)
    }
    await Url.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


app.listen(PORT, ()=>{
    console.log('server is running on ',PORT)
})