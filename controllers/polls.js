//File: controllers/polls.js
var mongoose = require('mongoose');
var Poll  = mongoose.model('poll');

//GET - Return all polls in the DB
exports.findAllPolls = function(req, res) {
	Poll.find(function(err, polls) {
    if(err) res.send(500, err.message);

    console.log('GET /polls')
		res.status(200).jsonp(polls);
	});
};

//GET - Return a poll with specified ID
exports.findById = function(req, res) {
	Poll.findById(req.params.id, function(err, poll) {
    if(err) return res.send(500, err.message);

    console.log('GET /poll/' + req.params.id);
		res.status(200).jsonp(poll);
	});
};

//GET - Search USER POLLS in the DB
exports.searchPolls = function (req, res) {
    console.log('GET POLLS');
	console.log(req.params.id)
    Poll.find({idUser: req.params.id}, function (err, poll) {
		console.log(poll)
        if (err) return res.send(500, err.message);
        if (poll !== null){
            console.log("OK")
            res.status(200).jsonp(poll);
        } else {
            console.log("Error")
            res.status(401).jsonp(poll);;
        }
    });
};

//POST - Insert a new poll in the DB
exports.addPoll = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var poll = new Poll({
		title:    req.body.title,
		ubication: 	  req.body.ubication,
		commentary:  req.body.commentary,
		negativeVote:   req.body.negativeVote,
		private:  req.body.private,
		possibilities: req.body.possibilities,
		idUser: req.body.idUser,
		oneVote: req.body.oneVote,
		type: req.body.type,
	});
	poll.remove();
	poll.save(function(err, poll) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(poll);
	});
};

/*//PUT - Update a register already exists
exports.updateTVShow = function(req, res) {
	TVShow.findById(req.params.id, function(err, tvshow) {
		tvshow.title   = req.body.petId;
		tvshow.year    = req.body.year;
		tvshow.country = req.body.country;
		tvshow.poster  = req.body.poster;
		tvshow.seasons = req.body.seasons;
		tvshow.genre   = req.body.genre;
		tvshow.summary = req.body.summary;

		tvshow.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(tvshow);
		});
	});
};*/

/*//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = function(req, res) {
	TVShow.findById(req.params.id, function(err, tvshow) {
		tvshow.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});*/
