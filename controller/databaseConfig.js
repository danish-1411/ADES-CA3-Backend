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
            host: "remotemysql.com",
            user: "Mk2cexMzmr",
            password: "dL4Xy5zZUg",
            database: "Mk2cexMzmr"
        });

        return conn;
    }
};

//---------------------------------------------------------------------
// exports
//---------------------------------------------------------------------
module.exports = dbconnect;