const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: './.env'
    });
}

const port = process.env.PORT;
const dbconnection = process.env.MONGOURL;

app.listen(port, (req, res)  =>{
    console.log(`Server is running on port ${port}`);
    console.log(`database url is ${dbconnection}`);
});


app.get('/', (req, res)=>{
    res.send('Server Online!')
    console.log("tried loading homapage")
})

// db connection

mongoose.connect(dbconnection, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected.'))
.catch(err => console.log(err));

const userroute = require('./route/userRoutes')

app.use('/api/user', userroute)
