
var mongoose = require('mongoose');
var User = mongoose.model('user');
var service = require('../app.js');
var fieldEncryption = require('mongoose-field-encryption')

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
            console.log('ya hay usuario con este nombre')
        } else {

            User.findOne({ email: req.body.email }, function (err, user) {
                if (err) return res.send(500, err.message);

                if (user == null) {
                    console.log('intento guardar', userNew)
                    userNew.save(function (err, userNew) {

                        if (err) return res.send(500, err.message);
                        res.status(200).jsonp(userNew);
                        console.log('guardar', userNew)
                    });
                } else {
                    console.log('ya hay usuario con este email')
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

    req.body.password = fieldEncryption.encrypt(String(req.body.password), '0470808');

    /*    var decrypted = fieldEncryption.decrypt('76b1f05eee14c87b', '0470808')
        console.log(decrypted)*/

    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) return res.send(500, err.message);
        if (user !== null) {
            console.log("OK")
            res.status(200).jsonp(user)

        } else {
            console.log("Error")
            res.status(401).jsonp();;
        }
    });
};

//PUT - Update a register already exists
exports.updateUser = function (req, res) {

    User.findById(req.params.id, function (err, user) {

        console.log('password', user.password)

        if (user.password === req.body.password) {

            if (req.body.newName !== null && req.body.newName !== '') {

                user.name = req.body.newName,

                User.findOne({ name: req.body.newName }, function (err, userFind) {
                    if (err) return res.send(500, err.message);
                    console.log('userFind',userFind)
                    if (userFind == null) {
                        console.log("No hay usuario con este nombre")
                        user.save(function (err) {
                            if (err) return res.send(500, err.message);
                            res.status(200).jsonp(user);
                        });
                    } else {
                        console.log("Error")
                        res.status(401).jsonp();
                    }
                });
            } else {

                console.log('No cambia nombre')
                user.password = fieldEncryption.encrypt(String(req.body.newPassword), '0470808');

                user.save(function (err) {
                    if (err) return res.send(500, err.message);
                    res.status(200).jsonp(user);
                });
            }

        } else {
            console.log("Error")
            res.status(402).jsonp();
        }

    });
};

//POST - Delete in the DB
exports.deleteUser = function (req, res) {
    console.log(' DELETE');
    console.log(req.params.id)
    User.findById(req.params.id, function (err, user) {
        console.log(user)
        user.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(user);
        })
    });
}
