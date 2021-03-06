const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

dotenv.config() 

//import Routes
const authRoute = require('./routes/users')
const feedbackRoute = require('./routes/feedback')
const feedbackElementRoute = require('./routes/feedbackElement')
const PORT = process.env.PORT || 3001
const HOST = '0.0.0.0';

//Middlewares
app.use(bodyParser.json())
app.use(express.json())
app.use(cors(
    ({
        origin: 'http://www.bonbonfrancais.online'  
    })
))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501", "http://www.bonbonfrancais.online")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });

//Route middlewares
app.use('/admin-panel', authRoute)
app.use('/feedback', feedbackRoute)
app.use('/feedbackElement', feedbackElementRoute)



app.get('/', (req, res) => {
    res.send('DB')
})

//connect to DB 
mongoose.connect(
process.env.DB_CONNECTION,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
},
() => console.log('Connected to DB!')
)

app.listen(PORT, HOST, () => {
    console.log('Server has been started on port ' + PORT)
})