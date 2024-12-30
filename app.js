const express = require('express');
const app = express();
const  morgan = require('morgan')
const userModel = require('./models/user')
const dbConnection = require('./config/db')

app.set('view engine', 'ejs')
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

// app.use((req, res, next) => {
//     console.log('THis is middleware')
//     return next();
// })

app.get('/',(req, res) => {
    res.render('index')
})

app.get('/about', (req, res) =>{
    res.send('About Page')
})

app.get('/profile', (req, res) => {
    res.send('Profile Page')
})

app.post('/get-form-data', (req, res) => {
    console.log(req.body)
    res.send('Data received')
})
// this route shows the register route
app.get('/register',(req, res) => {
    res.render('register')
})
// this route registers the user
app.post('/register', async (req, res) => {
    console.log(req.body)

    const {username, email, password} = req.body
    await userModel.create({
        username: username,
        email: email,
        password: password,
    })

    res.send('User registered')

})

app.get('/get-users', (req, res) => {
    userModel.find().then((users) => {
        res.send(users)
    })
})

app.get('/update-user',async (req, res) => {
    await userModel.findOneAndUpdate({
        username: 'a'
    }, {
        email: 'c@c.com'
    })

    res.send('User Updated')
})

app.get('/delete-user', async(req, res) => {
    await userModel.findOneAndDelete({
        username: 'b'
    })
    res.send('user deleted')
}) 

app.listen(3000)