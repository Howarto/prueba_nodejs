// app.js

// VARIABLE DECLARATION
// =============================================================================
// Call the packages
var express    = require('express');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// Connection mongoose-mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Beach = require('./models/beach');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

router.use(function(req, res, next) {
    console.log('CRUD method is running!');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Hello world!' });
});

// main routes

router.route('/beaches')

	// POST
	.post(function(req, res) {

		var beach = new Beach();
		beach.name = req.body.name;  // set the beachs name

		beach.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'beach created!' });
		});


	})

	// GET all
	.get(function(req, res) {
		Beach.find(function(err, beaches) {
			if (err)
				res.send(err);

			res.json(beaches);
		});
	});

router.route('/beaches/:beach_id')

	// get the beach with that id
    .get(function(req, res) {
		Beach.findById(req.params.beach_id, function(err, beach) {
			if (err)
				res.send(err);
			res.json(beach);
		});
	})

	// update the beach with this id
	.put(function(req, res) {
		Beach.findById(req.params.beach_id, function(err, beach) {

			if (err)
				res.send(err);

			beach.name = req.body.name;
			beach.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'beach updated!' });
			});

		});
	})

	// delete the beach with this id
	.delete(function(req, res) {
		Beach.remove({
			_id: req.params.beach_id
		}, function(err, beach) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes (of 'router') will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port ' + port);
