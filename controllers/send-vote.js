
var mongoose = require('mongoose');
var Send = mongoose.model('send');
var Pending =  mongoose.model('pending');

//GET - Return all sends in the DB
exports.findAllSend = function (req, res) {
    Send.find(function (err, sends) {
        if (err) res.send(500, err.message);
        console.log('GET /sends')
        res.status(200).jsonp(sends);
    });
};

//GET - Return a send with specified ID
exports.findById = function (req, res) {
    Send.findById(req.params.id, function (err, send) {
        if (err) return res.send(500, err.message);

        console.log('GET /send/' + req.params.id);
        res.status(200).jsonp(send);
    });
};

//POST - Insert a new USER in the DB
exports.addSend = function (req, res) {
    console.log('POST AÑADIR PENDINTE');
    console.log(req.body);

    var sendNew = new Send({
        idUser: req.body.idUser,
        idPolls: req.body.idPolls,
    });


    Send.findOne({ idUser: req.body.idUser }, function (err, send) {
        if (err) return res.send(500, err.message);
        if (send == null) {
            console.log('ya hay')
            sendNew.save(function (err, sendNew) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(sendNew);
            });
        } else {
            res.status(200).jsonp(sendNew); 
        }
    });
};

//POST - Insert a new USER in the DB
exports.deleteSend = function (req, res) {
    console.log('POST DELETE');
    console.log(req.body);

    Send.findOne({ idUser: req.body.idUser }, function (err, send) {
        if (err) return res.send(500, err.message);
        if (send == null) {
            console.log('no encuentro')
        } else {
            console.log('encuentro')
            Send.findOneAndUpdate({ idUser: req.body.idUser }, { $pull: { idPolls: req.body.idPolls } }, function (err, send) {
                if (err) return res.send(500, err.message);
                console.log(send)
                res.status(200).jsonp(send);
            });
        }
    });

}




//GET - Search SEND in the DB
exports.searchSend = function (req, res) {
    console.log('GET SEND');
    console.log(req.params.id)

    Send.find({ idUser: req.params.id }, function (err, send) {

        if (err) return res.send(500, err.message);
        if (send !== null) {
            console.log("OK")
            res.status(200).jsonp(send);
        } else {
            console.log("Error")
            res.status(401).jsonp(send);;
        }
    });
};

