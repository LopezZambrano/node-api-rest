
var mongoose = require('mongoose');
var User = mongoose.model('user');

//GET - Return all users in the DB
exports.findAllUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) res.send(500, err.message);

        console.log('GET /users')
        res.status(200).jsonp(users);
    });
};

//GET - Return a user with specified ID
exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.send(500, err.message);

        console.log('GET /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

//POST - Insert a new USER in the DB
exports.addUser = function (req, res) {
    console.log('POST REGISTER');
    console.log(req.body);

    var userNew = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    User.findOne({ name: req.body.name }, function (err, user) {
        if (err) return res.send(500, err.message);
        if (user != null) {
            res.status(401).jsonp();
        } else {
            User.findOne({ email: req.body.email, name: req.body.name }, function (err, user) {
                if (err) return res.send(500, err.message);
                if (user == null) {
                    userNew.save(function (err, userNew) {
                        if (err) return res.send(500, err.message);
                        res.status(200).jsonp(userNew);
                    });
                } else {
                    console.log("Error")
                    res.status(400).jsonp(userNew);
                }
            });
        }
    });


};

//POST - Search user in the DB
exports.searchUser = function (req, res) {
    console.log('POST LOGIN');
    console.log(req.body);

    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) return res.send(500, err.message);
        if (user !== null) {
            console.log("OK")
            res.status(200).jsonp(user);
        } else {
            console.log("Error")
            res.status(401).jsonp(user);;
        }
    });
};

//PUT - Update a register already exists
exports.updateUser = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        user.name = req.body.name,
        user.email = req.body.email,
        user.password = req.body.password
        user.photo = req.body.password

        User.findOne({ name: req.body.name }, function (err, user) {
            if (err) return res.send(500, err.message);
            if (user == null) {
                console.log("OK")
                user.save(function (err) {
                    if (err) return res.send(500, err.message);
                    res.status(200).jsonp(user);
                });
            } else {
                console.log("Error")
                res.status(401).jsonp(user);;
            }
        });


    });
};

/*//PUT - Update a register already exists
exports.updateTVShow = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        user.name = req.body.name;
        user.password = req.body.password

        user.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(tvshow);
        });
    });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        user.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200);
        })
    });
};*/