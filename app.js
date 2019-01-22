var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var cors = require('cors');

app.use(cors());

const feedbackRoutes = require('./api/routes/Feedbacks');

mongoose.connect('mongodb://dieterverboven:admin@locateit-shard-00-00-8tyvx.mongodb.net:27017,locateit-shard-00-01-8tyvx.mongodb.net:27017,locateit-shard-00-02-8tyvx.mongodb.net:27017/test?ssl=true&replicaSet=LocateIT-shard-0&authSource=admin&retryWrites=true', { useMongoClient: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/Feedback', feedbackRoutes);

app.get('/', (req, res)=> {
   res.send('Hello World');
});

app.listen(3000, ()=>{
    console.log("Server is running");
});

