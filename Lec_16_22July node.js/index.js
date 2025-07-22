import http from 'http'
import fs from 'fs/promises'
const PORT=process.env.PORT

const users=[
    {id:1,name:'john',age:32,email:'john@gmail.com'},
    {id:2,name:'albert',age:22,email:'albert@gmail.com'},
    {id:3,name:'kabba',age:11,email:'kabba@gmail.com'},
]

function getUsers(req,res){
    res.writeHead(200,{"content-type":"text/html"})
    let html = `<h2>User List</h2><ul>`;
    users.forEach(user=>{
    html+=`<li>name: ${user.name} age: ${user.age} email: ${user.email}</li>`
   })
   html+="</ul>";
   res.end(html)
}

function getUserById(req,res){
    const uesrId=parseInt(req.url.split('/')[2])
    let user=users.find(user=>user.id===uesrId)
     res.write((JSON.stringify(user)))
     res.end()
}

const app=http.createServer((req,res)=>{

    if(req.url==='/'){
        res.end('home route')
    }else if(req.url==='/content' && req.method==='GET'){
        //send txt content
         fs.readFile('./public/test.txt').then(data=>{
            res.end(data)
         })
    }else if(req.url==='/html' && req.method==='GET'){
        //send html content
         fs.readFile('./public/index.html').then(data=>{
            res.writeHead(200,{"content-type":"text/html"})
            res.end(data)
         })
    }else if(req.url==='/users' && req.method==='GET'){
       getUsers(req,res)
    }else if(/^\/user\/\d+$/.test(req.url)){
       getUserById(req,res)
    }else{
        res.end('invaid')
    }
})

app.listen(PORT,()=>{
    console.log('server is running on ',PORT)
})