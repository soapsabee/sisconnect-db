const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

const url = process.env.MONGO_URI ;
mongoose.connect('mongodb+srv://soapsabee:s5930213055Pati@sisconnect-db-btudi.mongodb.net/',{dbName: 'sisconned-db'});

var db = mongoose.connection;

// db.on('connected', function(){

//     console.log('Mongoose connected');
    
//     });
    
//     // เมื่อการเชื่อมต่อไม่สำเร็จ
    
//     db.on('error', function(err){
    
//     console.log('Mongoose error: ' + err);
    
//     });

mongoose.connect('mongodb+srv://soapsabee:s5930213055Pati@sisconnect-db-btudi.mongodb.net/', { dbName:'sisconned-db' })
  .then( () => {
    console.log('Connection to the Atlas Cluster is successful!')
  })
  .catch( (err) => console.error(err));

//  (async() => {
//     const url = process.env.MONGO_URI ;
//     const connection = await mongo.connect(url);
//     const db = connection.db('sisconned-db')
//     collection = db.collection('student');
// })

app.get('/', (req,res)=> {
    res.send('Welcome1');
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});