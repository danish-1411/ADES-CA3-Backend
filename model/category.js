// Name      : Mohd Danish Shafiq
// Class     : DIT 2B22
// Admin no. : p2043483

var db = require('../controller/databaseConfig');

var Category={
    addCategory: function (data, callback) {
        var catname     = data.catname;
        var description = data.description;

        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                INSERT INTO
                    Mk2cexMzmr.category
                    (catname, description)
                VALUES
                    (?, ?);
                    `;

                conn.query(sql, [catname, description], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    getCategory: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM Mk2cexMzmr.category;';
                conn.query(sql, [], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } 
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    getCategorybyID: function (categoryid, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `SELECT 
                                * 
                            FROM 
                                Mk2cexMzmr.category
                            WHERE
                                categoryid = ?;`;
                conn.query(sql, [categoryid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } 
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    }
}

module.exports = Category;