const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const app = express();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const cors = require('cors');

app.use(bodyParser.json());

var allowedOrigins = ['http://localhost:8080',
                      'http://yourapp.com'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const url = process.env.MONGO_URI ;

const conn = mongoose.createConnection('mongodb+srv://soapsabee:s5930213055Pati@sisconnect-db-btudi.mongodb.net/sisconned-db')

  let gfs;

  conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('uploads');
  });

  const storage = new GridFsStorage({
    url: 'mongodb+srv://soapsabee:s5930213055Pati@sisconnect-db-btudi.mongodb.net/sisconned-db',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
      });
    }
  });
  
   const upload = multer({ storage });


var Schema = mongoose.Schema;
var studentDataSchema = new Schema({

  reciptentId: {type: String},
  studentID: String,
  lang: String,
  notification: Boolean

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

app.post('/upload', upload.any(), (req, res) => {
  console.log(req.body)
  console.log(req.files)
  res.redirect('/');
});


app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if the input is a valid image or not
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // If the file exists then check whether it is an image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      res.set('Content-Type', 'image/jpeg');
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});


app.post('/insertProfile', (req,res) => {

  var item = {
    reciptentId: req.body.reciptentId,
    studentID: req.body.studentID,
    lang: req.body.lang,
    notification: req.body.notification
  };

  var data = new StudentData(item);
  data.save();

  res.send("success 200")
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('App is running on http://localhost:' + port);
});