import http from 'http'
const PORT=process.env.PORT

const app=http.createServer((req,res)=>{
    const data='<h2>headidng tag<h2>'

    if(req.url==='/' && req.method==='GET'){
        // res.setHeader('Content-Type','text/html')
        // res.statusCode=404;
        res.writeHead(200, {'Content-Type': 'text/html'})

        res.end(data)
    }else{
        res.end('invaid')
    }
})

app.listen(PORT,()=>{
    console.log('server is running on ',PORT)
})