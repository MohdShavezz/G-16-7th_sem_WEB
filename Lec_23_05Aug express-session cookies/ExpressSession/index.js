const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 5000

app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'uniqueKey',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))

app.get('/', (req, res) => {
    console.log(req.session.username)
    if (req.session.username) {
        res.send(`<h2> hello , ${req.session.username}!</h2>
            <a href="/logout">Logout </a>
            `)
    } else {
        res.send(`<h2> You are not logged!</h2>
                <form method="POST" action="/login"> 
                 <input name="username" placeholder="Enter username" required/>
                 <button type="submit">Login </botton>
                </form>
                `)

    }
})

app.post('/login', (req, res) => {
    const { username } = req.body
    if (username) {
        req.session.username = username
        res.redirect('/')
    } else {
        res.send('login failed.')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('logut failed')
        }
        res.redirect('/')
    })
})


app.listen(PORT, () => {
    console.log('server is running on ', PORT)
})

