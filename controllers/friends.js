
var mongoose = require('mongoose');
var Friend = mongoose.model('friend');

//GET - Return all friends in the DB
exports.findAllFriends = function (req, res) {
    Friend.find(function (err, friends) {
        if (err) res.send(500, err.message);
        console.log('GET /friends')
        res.status(200).jsonp(friends);
    });
};

//GET - Return a friend with specified ID
exports.findById = function (req, res) {
    Friend.findById(req.params.id, function (err, friend) {
        if (err) return res.send(500, err.message);

        console.log('GET /friend/' + req.params.id);
        res.status(200).jsonp(friend);
    });
};

//POST - Insert a new USER in the DB
exports.addFriend = function (req, res) {
    console.log('POST AÑADIR AMIGO');
    console.log(req.body);

    var friendNew = new Friend({
        idUser: req.body.idUser,
        idFriends: req.body.idFriend,
    });

    Friend.findOne({ idUser: req.body.idUser }, function (err, friend) {
        if (err) return res.send(500, err.message);
        if (friend == null) {
            friendNew.save(function (err, friendNew) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(friendNew);
            });
        } else {
            if (friend.idFriends.indexOf(req.body.idFriend) === -1) {
                Friend.findOneAndUpdate({ idUser: req.body.idUser }, { $push: { idFriends: req.body.idFriend } }, function (err, friend) {
                    if (err) return res.send(500, err.message);
                    res.status(200).jsonp(friendNew);
                });
            } else {
                res.status(200);
            }
        }
    });
};


//GET - Search FRIENDS in the DB
exports.searchFriends = function (req, res) {
    console.log('GET FRIENDS');
    console.log(req.params.id)

    Friend.find({ idUser: req.params.id }, function (err, friend) {
        console.log(friend)
        if (err) return res.send(500, err.message);
        if (friend !== null) {
            console.log("OK")
            res.status(200).jsonp(friend);
        } else {
            console.log("Error")
            res.status(401).jsonp(friend);;
        }
    });
};


/*//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        user.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200);
        })
    });
};*/