// Name      : Mohd Danish Shafiq
// Class     : DIT 2B22
// Admin no. : p2043483

const db = require('../controller/databaseConfig');
var Game = {
    addGame: function (data, callback) {
        var title = data.title;
        var description = data.description;
        var price = data.price;
        var platform = data.platform;
        var categoryid = data.categoryid;
        var year = data.year;
        var images = data.images;

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
                    spgames.game
                    (title, description, price, platform, categoryid, year, images)
                VALUES
                    (?, ?, ?, ?, ?, ?, ?);
                    `;

                conn.query(sql, [title, description, price, platform, categoryid, year, images], function (err, result) {
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
    searchGames: function (price, platform, title, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = ` SELECT 
                                g.gameid, g.title, g.description, g.price, g.platform, c.categoryid, c.catname, g.year, g.created_at, g.images
                            FROM 
                                spgames.category AS c,
                                spgames.game AS g
                            WHERE 
                                g.price <= ?
                                AND platform = ? 
                                AND g.title LIKE '%${title}%'
                                AND c.categoryid = g.categoryid;`;
                conn.query(sql, [price, platform, title], function (err, result) {
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
    getAllGames: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = ` SELECT 
                                * 
                            FROM 
                                spgames.game as g,
                                spgames.category as c
                            WHERE
                                c.categoryid = g.categoryid`;
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
    deleteGame: function (gameid, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `                             
                DELETE FROM
	                spgames.game
                WHERE
                    gameid = ?;
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
    updateGame: function (gameid, data, callback) {
        var title = data.title;
        var description = data.description;
        var price = data.price;
        var platform = data.platform;
        var categoryid = data.categoryid;
        var year = data.year;

        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                UPDATE 
	                spgames.game
                SET
                    title = ?,
                    description = ?,
                    price = ?,
                    platform = ?,
                    categoryid = ?,
                    year = ?
                WHERE
                    gameid = ?;
                `;

                conn.query(sql, [title, description, price, platform, categoryid, year, gameid], function (err, result) {
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
    getGamesByGameID: function (gameid, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = ` SELECT
                                g.gameid, g.title, g.description, g.price, g.platform, c.catname, g.year, g.images
                            FROM
                                spgames.category AS c,
                                spgames.game AS g
                            WHERE
                                c.categoryid = g.categoryid
                                AND gameid = ?;`;
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
    getGamesByCategory: function (platform, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = ` SELECT 
                                g.gameid, g.title, g.description, g.price, g.platform, c.categoryid, c.catname, g.year, g.created_at, g.images
                            FROM 
                                spgames.category AS c,
                                spgames.game AS g
                            WHERE 
                                c.catname = ?
                                AND c.categoryid = g.categoryid;`;
                conn.query(sql, [platform], function (err, result) {
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
    getGamesForHome: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = ` SELECT 
                                g.gameid, g.title, g.description, g.price, g.platform, c.categoryid, c.catname, g.year, g.created_at, g.images
                            FROM 
                                spgames.category AS c,
                                spgames.game AS g
                            WHERE 
                                g.gameid <= 10
                                AND c.categoryid = g.categoryid;`;
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
    }
}

module.exports = Game;
