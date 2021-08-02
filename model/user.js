// Name      : Mohd Danish Shafiq
// Class     : DIT 2B22
// Admin no. : p2043483

var db = require('../controller/databaseConfig');

var User={
    verify: function (username, password, callback) {

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {

            if (err) { 
                //database connection gt issue!
                console.log(err);
                return callback(err, null);
            } 
            else {

                const query = `
                    SELECT 
                        * 
                    FROM 
                        Mk2cexMzmr.user 
                    WHERE 
                        username=? 
                        AND password=?`;

                dbConn.query(query, [username, password], (error, results) => {
                    if (error) {
                        callback(error, null);
                        return;
                    }
                    if (results.length === 0) {
                        return callback(null, null);

                    } 
                    else {
                        const user = results[0];
                        return callback(null, user);
                    }
                });
            }
        });
    },
    addUser: function (data, callback) {
        var username         = data.username;
        var email            = data.email;
        var password         = data.password;

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
                    Mk2cexMzmr.user
                (username, email, password)
                VALUES
                    (?, ?, ?);
                    `;

                conn.query(sql, [username, email, password], function (err, result) {
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
    getUserByid: function (userid, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = ` SELECT
                                userid, username, email, profile_pic_url, type
                            FROM 
                                Mk2cexMzmr.user
                            WHERE
                                userid = ?;`;
                conn.query(sql, [userid], function (err, result) {
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
    getTypeByUserid: function (userid, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = ` SELECT
                                type
                            FROM 
                                Mk2cexMzmr.user
                            WHERE
                                userid = ?;`;
                conn.query(sql, [userid], function (err, result) {
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

module.exports = User;



