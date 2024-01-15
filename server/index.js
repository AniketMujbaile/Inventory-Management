const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const mongoDB = require('./config/mongoose')
const authRoutes = require('./routes/authRoutes');
const PORT= process.env.PORT || 8000
const app = express()

app.use(cors())

app.use(express.json())

app.use('/', authRoutes);
app.use('/', require('./routes'))

mongoDB.then( () => {
    app.listen(PORT, () => {
        console.log("Server is running!")
    })
} ).catch((error) => {
    console.log("Error in connecting to DB!")
})

