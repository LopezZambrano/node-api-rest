
var mongoose = require('mongoose');
var Vote = mongoose.model('vote');

//GET - Return all votes in the DB
exports.findAllVotes = function (req, res) {
    Vote.find(function (err, votes) {
        if (err) res.send(500, err.message);
        console.log('GET /votes')
        res.status(200).jsonp(votes);
    });
};

//GET - Return a vote with specified ID
exports.findById = function (req, res) {
    Vote.findById(req.params.id, function (err, vote) {
        if (err) return res.send(500, err.message);

        console.log('GET /vote/' + req.params.id);
        res.status(200).jsonp(vote);
    });
};

//POST - Insert a new USER in the DB
exports.addVote = function (req, res) {
    console.log('POST AÑADIR VOTO');
  
    var voteNew = new Vote({
        idPoll: req.body.idPoll,
        options: req.body.options,
    });

    Vote.findOne({ idPoll: req.body.idPoll}, function (err, vote) {
        if (err) return res.send(500, err.message);
        if (vote == null) {
            console.log('NO ENCUENTRO VOTOS')
            voteNew.save(function (err, voteNew) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(voteNew);
            });
        } else {
            console.log('ENCUENTRO VOTOS')

            var idUser = req.body.idUser;

            vote.idPoll = req.body.idPoll;
            vote.options = req.body.options;
            

            vote.save(function (err){
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(vote);
            });

        }
    });
};


//GET - Search VOTES in the DB
exports.searchVotes = function (req, res) {
    console.log('GET VOTES');
	console.log(req.params.id)

    Vote.find({idPoll: req.params.id}, function (err, vote) {
		console.log(vote)
        if (err) return res.send(500, err.message);
        if (vote !== null){
            console.log("OK")
            res.status(200).jsonp(vote);
        } else {
            console.log("Error")
            res.status(401).jsonp(vote);;
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