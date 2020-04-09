var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./db.js');


app.use(bodyParser.json());

var connection = db.get_connection();

var clubs = 
    "{ \"DECA\":[ \"Director of Marketing\", \"Director of Events\", \"Director of Digital Marketing\", \"Director of Finance\", \"Director of Training\", \"Director of Human Resources\", \"Director of Corporate Relations\", \"Director of Information Technology\"]," + 
    "\"MESA\":[ \"Director of Operations\", \"Director of Curriculum\", \"Director of Finance\", \"Director of Corporate Relations\", \"Director of Human Resources\", \"Director of Marketing\"]," + 
    "\"IS\":[ \"Marketing\", \"Operations\", \"Business Development\"]," + 
    "\"TMG\":[ \"Marketing Director\", \"Events Director\", \"Project Director\", \"Social Media Director\", \"Corporate Relations Director\", \"Finance Director\", \"Curriculum Director\"]," + 
    "\"HRA\":[ \"Director of Finance\", \"Director of Event Logistics\", \"Director of Multimedia Design\", \"Director of Web and Social Media\", \"Director of Member Engagement\", \"Director of Training and Development\", \"Director of Project Management\", \"Director of Corporate Relations\"]," + 
    "\"AOA\":[ \"Marketing Director\", \"Events Director\", \"CR Director\", \"Finance Director\", \"HR Director\", \"Data Analytics Director\", \"Digital Media Director\"]," + 
    "\"MIBA\":[ \"Marketing\", \"Events\", \"Business Operations\", \"External Relations\", \"Innovation\"]," + 
    "\"MTA\":[ \"Director of Marketing\", \"Director of Operations\", \"Director of Corporate Relations\", \"Director of Web Development\", \"Director of Curriculum\", \"Director of Case Competition\", \"Director of Finance\", \"Director of Internal Affairs\"]," + 
    "\"WIBA\":[ \"Director of Digital Channels\", \"Director of Communications\", \"Director of Events\", \"Director of Strategic Initiatives\"]," + 
    "\"ENIGMA\":[ \"Director of Marketing\", \"Director of Operations\", \"Director of IT\"]," + 
    "\"SBA\":[ \"Director of Marketing\", \"Director of Operations\", \"Director of Corporate Relations\"]" + 
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

