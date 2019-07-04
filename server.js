const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

const url = process.env.MONGO_URI ;

mongoose.connect('mongodb+srv://soapsabee:s5930213055Pati@sisconnect-db-btudi.mongodb.net/', { dbName:'sisconned-db' })
  .then( () => {
    console.log('Connection to the Atlas Cluster is successful!')
  })
  .catch( (err) => console.error(err));

var Schema = mongoose.Schema;
var studentDataSchema = new Schema({

  reciptentId: {type: String},
  studentID: String,
  lang: String

}, {collection: 'student'})

var StudentData = mongoose.model('StudentData', studentDataSchema);

//  (async() => {
//     const url = process.env.MONGO_URI ;
//     const connection = await mongo.connect(url);
//     const db = connection.db('sisconned-db')
//     collection = db.collection('student');
// })

app.get('/', (req,res)=> {
    res.send('Welcome1');
})

app.post('/insert', (req,res) => {

  var item = {
    reciptentId: req.body.reciptentId,
    studentID: req.body.studentID,
    lang: req.body.lang
  };

  var data = new StudentData(item);
  data.save();

})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});