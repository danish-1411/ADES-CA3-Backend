// Name      : Mohd Danish Shafiq
// Class     : DIT 2B22
// Admin no. : p2043483

//---------------------------------------------------------------------
// imports
//---------------------------------------------------------------------
var mysql = require('mysql');

//---------------------------------------------------------------------
// objects / functions
//---------------------------------------------------------------------
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "p2043483",
            database: "spgames"
        });

        return conn;
    }
};

//---------------------------------------------------------------------
// exports
//---------------------------------------------------------------------
module.exports = dbconnect;