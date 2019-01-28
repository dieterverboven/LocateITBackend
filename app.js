var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var cors = require('cors');

app.use(cors());

const feedbackRoutes = require('./api/routes/Feedbacks');
const productRoutes = require('./api/routes/Products');
const afdelingRoutes = require('./api/routes/Afdelingen');


mongoose.connect('mongodb://dieterverboven:admin@locateit-shard-00-00-8tyvx.mongodb.net:27017,locateit-shard-00-01-8tyvx.mongodb.net:27017,locateit-shard-00-02-8tyvx.mongodb.net:27017/test?ssl=true&replicaSet=LocateIT-shard-0&authSource=admin&retryWrites=true', { useMongoClient: true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/Feedback', feedbackRoutes);
app.use('/Products', productRoutes);
app.use('/Afdelingen', afdelingRoutes);

app.get('/', (req, res)=> {
   res.send('Hello World');
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

