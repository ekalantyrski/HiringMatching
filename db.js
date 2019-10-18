var mysql = require('mysql');

module.exports = {

    get_connection: function()
    {
        var connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'deix3jlfmjf', 
			port: '3306',
			database : 'mgmtclubs'
        });
        
        return connection;

    },

    createPosition: function(con, position, ranking, cb){
        data = [position,ranking]
        con.query("INSERT into clubs (position, ranking) VALUES (?, ?)", data, function(err, result){
            if(err)
            {
                console.log("Error inserting into club: " + err)
                cb(false);
            }
            cb(true);
        });
    },

    createApp: function(con, email, ranking, share, cb){
        data = [email,ranking, share]
        con.query("INSERT into apps (id, ranking, share) VALUES (?, ?, ?)", data, function(err, result){
            if(err)
            {
                console.log("Error inserting into club: " + err)
                cb(false);
            }
            cb(true);
        });
    }
}