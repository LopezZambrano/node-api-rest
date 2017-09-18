
var mongoose = require('mongoose');
var Pending = mongoose.model('pending');

//GET - Return all pendings in the DB
exports.findAllPending = function (req, res) {
    Pending.find(function (err, pendings) {
        if (err) res.send(500, err.message);
        console.log('GET /pendings')
        res.status(200).jsonp(pendings);
    });
};

//GET - Return a pending with specified ID
exports.findById = function (req, res) {
    Pending.findById(req.params.id, function (err, pending) {
        if (err) return res.send(500, err.message);

        console.log('GET /pending/' + req.params.id);
        res.status(200).jsonp(pending);
    });
};

//POST - Insert a new USER in the DB
exports.addPending = function (req, res) {
    console.log('POST AÑADIR PENDINTE');
    console.log(req.body);

    var pendingNew = new Pending({
        idUser: req.body.idUser,
        idPolls: req.body.idPolls,
    });


    Pending.findOne({ idUser: req.body.idUser }, function (err, pending) {
        if (err) return res.send(500, err.message);
        if (pending == null) {
            console.log('ya hay')
            pendingNew.save(function (err, pendingNew) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(pendingNew);
            });
        } else {
            console.log('no hay')
            Pending.findOneAndUpdate({ idUser: req.body.idUser }, { $push: { idPolls: req.body.idPolls } }, function (err, pending) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(pendingNew);
            });
        }
    });
};

//POST - Delete in the DB
exports.deletePending = function (req, res) {
    console.log('POST DELETE');
    console.log(req.body);

    Pending.findOne({ idUser: req.body.idUser }, function (err, pending) {
        if (err) return res.send(500, err.message);
        if (pending == null) {
            console.log('no encuentro')
        } else {
            console.log('encuentro')
            Pending.findOneAndUpdate({ idUser: req.body.idUser }, { $pull: { idPolls: req.body.idPolls } }, function (err, pending) {
                if (err) return res.send(500, err.message);
                console.log(pending)
                res.status(200).jsonp(pending);
            });
        }
    });

}




//GET - Search PENDING in the DB
exports.searchPending = function (req, res) {
    console.log('GET PENDING');
    console.log(req.params.id)

    Pending.find({ idUser: req.params.id }, function (err, pending) {

        if (err) return res.send(500, err.message);
        if (pending !== null) {
            console.log("OK")
            res.status(200).jsonp(pending);
        } else {
            console.log("Error")
            res.status(401).jsonp(pending);;
        }
    });
};

