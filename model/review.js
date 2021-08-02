// Name      : Mohd Danish Shafiq
// Class     : DIT 2B22
// Admin no. : p2043483

const db=require('../controller/databaseConfig');

var Review = {
    addReview: function (data, callback) {
        var content       = data.content;
        var rating      = data.rating;
        var userid       = data.userid;
        var gameid    = data.gameid;

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
                    Mk2cexMzmr.review
                    (content, rating, userid, gameid)
                VALUES
                    (?, ?, ?, ?);
                    `;

                conn.query(sql, [content, rating, userid, gameid], function (err, result) {
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
    getReviewByGame: function (gameid, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = ` 
                SELECT
	                g.gameid, r.content, r.rating, u.username, r.created_at
                FROM
                    Mk2cexMzmr.review AS r,
                    Mk2cexMzmr.game AS g,
                    Mk2cexMzmr.user as u
                WHERE
	                r.gameid = g.gameid
                    AND r.userid = u.userid
	                AND r.gameid = ?;
                    `;
                conn.query(sql, [gameid], function (err, result) {
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
    getReviewByUser: function (userid, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = ` 
                SELECT
	                g.title, r.content, r.rating, u.username, u.email, r.created_at
                FROM
                    Mk2cexMzmr.review AS r,
                    Mk2cexMzmr.game AS g,
                    Mk2cexMzmr.user as u
                WHERE
	                r.gameid = g.gameid
                    AND r.userid = u.userid
	                AND r.userid = ?;
                    `;
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
    getAllReviews: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM Mk2cexMzmr.review;';
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
    getReviewById: function (reviewid, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                SELECT 
                    * 
                FROM 
                    Mk2cexMzmr.review as r,
                    Mk2cexMzmr.user as u
                WHERE
                    reviewid = ?
                    AND u.userid = r.userid;`;
                conn.query(sql, [reviewid], function (err, result) {
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
module.exports = Review;
