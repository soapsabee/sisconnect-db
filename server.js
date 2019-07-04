const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');

const app = express();

app.use(bodyParser.json());

let collection = null;

(async() => {
    const url = process.env.MONGO_URI ;
    const connection = await mongo.connect(url);
    const db = connection.db('sisconned-db')
    collection = db.collection('student');
})

app.get('/',(req,res)=>{
    res.send('Welcome1');
})


app.listen(8000, () =>{
    console.log('Listening ...');
})