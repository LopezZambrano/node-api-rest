var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Connection to DB
mongoose.connect('mongodb://localhost/encuestasApp',  { useMongoClient: true }, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database EncuestasApp');
});


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models1    = require('./models/user')(app, mongoose);
var models2    = require('./models/poll')(app, mongoose);
var models3    = require('./models/vote')(app, mongoose);
var models4    = require('./models/friend')(app, mongoose);
var models5    = require('./models/pending-vote')(app, mongoose);
var models6    = require('./models/send-vote')(app, mongoose);
var userCtrl = require('./controllers/users');
var pollCtrl = require('./controllers/polls');
var voteCtrl = require('./controllers/votes');
var friendCtrl = require('./controllers/friends');
var pendingCtrl = require('./controllers/pending-vote');
var sendCtrl = require('./controllers/send-vote');


//// USER ROUTER ////////////////////////////////////////////////////
var users = express.Router();

users.route('/login')
  .post(userCtrl.searchUser);

users.route('/register')
  .post(userCtrl.addUser)

users.route('')
  .get(userCtrl.findAllUsers)

app.use('/user', users);


//// POLLS ROUTE /////////////////////////////////////////////////////
var polls = express.Router();

polls.route('/add')
  .post(pollCtrl.addPoll);

polls.route('')
  .get(pollCtrl.findAllPolls);

app.get('/poll/:id', pollCtrl.searchPolls)


app.use('/poll', polls);

//// VOTES /////////////////////////////////////////////////////////
var votes = express.Router();

votes.route('/add')
  .post(voteCtrl.addVote);

votes.route('')
  .get(voteCtrl.findAllVotes);

app.get('/vote/:id', voteCtrl.searchVotes)

app.use('/vote', votes);

//// FRIENDS /////////////////////////////////////////////////////////
var friends = express.Router();

app.post('/friend/add', friendCtrl.addFriend);
app.get('/friend', friendCtrl.findAllFriends);


app.get('/friend/:id', friendCtrl.searchFriends)

app.use('/friend', friends);

//// VOTOS PENDIENTES /////////////////////////////////////////////////////////
var pending = express.Router();

app.post('/pending/add', pendingCtrl.addPending);
app.post('/pending/delete', pendingCtrl.deletePending);
app.get('/pending', pendingCtrl.findAllPending);


app.get('/pending/:id', pendingCtrl.searchPending)

app.use('/pending', pending);

//// VOTOS ENVIADOS /////////////////////////////////////////////////////////
var send = express.Router();

app.post('/send/add', sendCtrl.addSend);
app.post('/send/delete', sendCtrl.deleteSend);
app.get('/send', sendCtrl.findAllSend);


app.get('/send/:id', sendCtrl.searchSend)

app.use('/send', send);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});