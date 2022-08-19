const PORT = process.env.PORT || 1000

const connectToDb = require('./config/db')
connectToDb()

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const initializePassport = require('./config/passport-config')

const app = express()

app.use(cors({origin:"http://localhost:3000"}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use(express.json())

app.use(passport.initialize());
app.use(passport.session());

initializePassport()

app.get('/', (req, res) => {
    res.send('home page')
})

app.use(require('./routes/posts'))
app.use(require('./routes/users'))

app.listen(PORT, () => {
    console.log('up and running on ' + PORT)
})