// Name      : Mohd Danish Shafiq
// Class     : DIT 2B22
// Admin no. : p2043483

//---------------------------------------------------------------------
// imports
//---------------------------------------------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var user = require('../model/user.js');
var games = require('../model/games')
var category = require('../model/category')
var review = require('../model/review')
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const isLoggedInMiddleware = require("../auth/isLoggedInMiddleware");
const User = require('../model/user.js');


//---------------------------------------------------------------------
// middleware functions
//---------------------------------------------------------------------
/**
 * prints useful debugging information about an endpoint we are going to service
 * 
 * @param {object} req 
 * request object
 * 
 * @param {object} res 
 * response object
 * 
 * @param {function} next 
 * reference to the next function to call
 */
var printDebugInfo = function (req, res, next) {
    console.log();
    console.log("----------------( Debug Info )------------------");

    console.log("Servicing " + req.url + "...");

    console.log("> req.params: " + JSON.stringify(req.params));
    console.log("> req.body: " + JSON.stringify(req.body));

    console.log("------------- ( Debug Info Ends )---------------");
    console.log();

    next();
}

var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//---------------------------------------------------------------------
// MF configurations
//---------------------------------------------------------------------
app.use(urlEncodedParser);
app.use(jsonParser);

app.options('*', cors());
app.use(cors());

//---------------------------------------------------------------------
// end points 
//---------------------------------------------------------------------
app.get("/", (req, res) => {
    res.sendFile("app.js", { root: __dirname });
});


app.post("/login/", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username == null || username == "" || password == null || password == "") {
        res.status(400).send("Invalid login details");
    }
    user.verify(username, password, (error, user) => {
        if (error) {
            res.status(500).send();
            return;
        }
        if (user === null) {
            res.status(401).send();
            return;
        }
        const payload = {
            user_id: user.userid,
            type: user.type
        };
        jwt.sign(
            // (1) payload
            payload,
            // (2) Secret key 
            JWT_SECRET,
            // (3) Signing Algorithm 
            { algorithm: "HS256" },
            // (4) response handle (callback function)
            (error, token) => {
                if (error) {
                    console.log(error);
                    res.status(401).send();
                    return;
                }
                res.status(200).send({
                    token: token,
                    user_id: user.userid
                });
            })
    });
});

app.post('/users', printDebugInfo, function (req, res) {
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    user.addUser(data, function (err, result) {
        if (!err) {
            console.log(result);
            var output = {
                "userid": result.insertId
            };
            res.status(201).send(output);
        }
        else if (err.code == 'ER_DUP_ENTRY') {
            res.status(422).send("Duplicate Category");
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/users/:id', printDebugInfo, function (req, res) {
    var userid = req.params.id;

    user.getUserByid(userid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.post('/category/', printDebugInfo, isLoggedInMiddleware, function (req, res) {
    var data = {
        catname: req.body.catname,
        description: req.body.description
    };

    console.log(req.decodedToken.type)
    // Authorisation check
    if (req.decodedToken.type != 'Admin') {
        res.status(403).send("Not authorized to add Category");
        return;
    }
    category.addCategory(data, function (err, result) {
        console.log(result);
        if (!err) {
            res.status(200).send(result);
        }
        else if (err.code == 'ER_DUP_ENTRY') {
            res.status(422).send("Duplicate Category");
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.post('/game/', printDebugInfo, isLoggedInMiddleware, function (req, res) {
    var data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        platform: req.body.platform,
        categoryid: req.body.categoryid,
        year: req.body.year,
        images: req.body.images
    };

    console.log(req.decodedToken.type)
    // Authorisation check
    if (req.decodedToken.type != 'Admin') {
        res.status(403).send("Not authorized to add Category");
        return;
    }
    games.addGame(data, function (err, result) {
        console.log(result);
        if (!err) {
            var output = {
                "gameid": result.insertId
            };
            res.status(201).send(output);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.post('/search', printDebugInfo, function (req, res) {
    var price = req.body.price;
    var title = req.body.title;
    var platform = req.body.platform;

    games.searchGames(price, platform, title, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/games', printDebugInfo, function (req, res) {
    games.getAllGames(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.post('/user/:uid/game/:gid/review', printDebugInfo, isLoggedInMiddleware, function (req, res) {
    var data = {
        content: req.body.content,
        rating: req.body.rating,
        userid: req.params.uid,
        gameid: req.params.gid
    };

    console.log(req.params.uid)
    console.log(req.decodedToken.user_id)
    // Authorisation check
    if (req.params.uid != req.decodedToken.user_id) {
        res.status(403).send("Not authorized to add reviews for other users");
        return;
    }
    review.addReview(data, function (err, result) {
        if (!err) {
            console.log(result);
            var output = {
                "reviewid": result.insertId
            };
            res.status(201).send(output);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/game/:id/review', printDebugInfo, function (req, res) {
    var gameid = req.params.id;

    review.getReviewByGame(gameid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/games/:id', printDebugInfo, function (req, res) {
    var gameid = req.params.id;

    games.getGamesByGameID(gameid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/category', printDebugInfo, function (req, res) {
    category.getCategory(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/category/:id', printDebugInfo, function (req, res) {
    var categoryid = req.params.id;

    category.getCategorybyID(categoryid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.delete('/game/:id', printDebugInfo, function (req, res) {
    var gameid = req.params.id;

    games.deleteGame(gameid, function (err, result) {
        if (!err) {
            res.status(204).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.put('/game/:id', printDebugInfo, function (req, res) {
    var data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        platform: req.body.platform,
        categoryid: req.body.categoryid,
        year: req.body.year
    };
    var gameid = req.params.id;

    games.updateGame(gameid, data, function (err, result) {
        if (!err) {
            res.status(204).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/game/:category', printDebugInfo, function (req, res) {
    var category = req.params.category;

    games.getGamesByCategory(category, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/review/:id', printDebugInfo, function (req, res) {
    var reviewid = req.params.id;

    review.getReviewById(reviewid, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});

app.get('/gamesforhome', printDebugInfo, function (req, res) {
    games.getGamesForHome(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Unknown error");
        }
    });
});


//---------------------------------------------------------------------
// exports
//---------------------------------------------------------------------
module.exports = app;
