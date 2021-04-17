const express = require('express')
const app = express();
const cors = require('cors')

const db = require('./config/db')
const routes = require('./api/routes')

//Express Setup
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api', routes)

//Db Setup
db.sync()
db.authenticate().then(() => console.log('Database Connected'))

app.listen(process.env.PORT, () => console.log(`App is running on port:${process.env.PORT}`))