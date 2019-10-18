var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./db.js');


app.use(bodyParser.json());

var connection = db.get_connection();

var clubs = 
"{ \"DECA\":[ \"Marketing\", \"Events\", \"Business Development\", \"Training\"]," + 
"\"MESA\":[ \"Marketing\", \"Business Development\", \"Finance\", \"Student Engagement\", \"Clubs & Academics\"]," + 
"\"IS\":[ \"Marketing\", \"Operations\", \"Business Development\"]," + 
"\"TMG\":[ \"Marketing\", \"Business Development\", \"Events\"]," + 
"\"HRA\":[ \"Marketing & Analytics\", \"Operations\", \"Corporate Relations\", \"Project Management\"]," + 
"\"AOA\":[ \"Marketing\", \"Events\", \"Business Development\"]," + 
"\"MIBA\":[ \"Marketing\", \"Events\", \"Business Development\", \"External Relations\", \"Innovation\"]," + 
"\"MTA\":[ \"Marketing\", \"Operations\", \"Corporate Relations\", \"Web Development\"]," + 
"\"WIBA\":[ \"Marketing\", \"Events\"]," + 
"\"SBA\":[ \"Marketing\", \"Operations\", \"Corporate Relations\"]" + 
"}";

var clubsObject = JSON.parse(clubs);


app.get('/hiring/clubs', function(req, res){
    res.sendFile(__dirname + "/clubs.html");
});

app.post('/hiring/clubs', function(req, res){
    var club = req.body.club;
    var positions = clubsObject[club];
    for(var pos in positions)
    {
        var posName = club + " " + positions[pos];
        var ranking = req.body[positions[pos]];
        db.createPosition(connection, posName, ranking, function(result)
        {
        }); 
    }
    res.send(JSON.stringify({"result": true}));
});

app.get('/hiring/applicants', function(req, res){
    res.sendFile(__dirname + "/apps.html");
});

app.post('/hiring/applicants', function(req, res){
    var id = req.body.email;
    var share = req.body.share;
    var ranking = req.body.ranking;
    console.log(ranking);
    db.createApp(connection, id, ranking, share, function(result){
        res.send(JSON.stringify({"result": result}));

    });


});


app.use(express.static('public'));
app.listen(8080, function() { 
	console.log('listening')
});

