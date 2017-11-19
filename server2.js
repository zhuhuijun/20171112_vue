var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://101.201.43.141/leaves', {useMongoClient: true});
var leaveSchema = new mongoose.Schema({
    title: String,
    content: String,
    createAt: {type: Date, default: Date.now}
});
mongoose.model('Leave', leaveSchema);
var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.listen(3000);
app.get('/', function (req, res) {
    res.sendFile('./17.data.html', {root: __dirname});
});
app.post('/leaves', function (req, res) {
    var data = req.body;
    console.info(data);
    mongoose.model('Leave').create(data, function (err,doc) {
        res.send(doc);
    });
    //res.send(data);
});
app.get('/leaves', function (req, res) {
    mongoose.model('Leave').find({}, function (err,doc) {
        res.send(doc);
    });
    //res.send(data);
});
