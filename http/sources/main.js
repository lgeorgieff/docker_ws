'use strict';

const MongoClient = require('mongodb').MongoClient;

const DATABASE = 'docker_ws';
const COLLECTION = 'main';
const URL = 'mongodb://mongo:27017/';

let db;
let connection;
function connect () {
    const OPTIONS = {useNewUrlParser: true};
    return new Promise((resolve, reject) => {
	MongoClient.connect(URL, OPTIONS, function(err, _db) {
	    if (err) {
		reject(err);
	    } else {
		connection = _db;
		db = _db.db(DATABASE);
		resolve(db)
	    }
	})
    })
	.catch((err) => {
	    console.error(`Could not connect to ${URL}: ${err}`);
	    throw err;
	})
}

function read_or_create () {
    return new Promise((resolve, reject) => {
	db.collection(COLLECTION).findOne({}, function(err, result) {
	    if (err) {
		reject(err)
	    } else if (result == null) {
		resolve(0);
	    } else {
		resolve(result.value);
	    }
	});
    })
	.then((value) => {
	    return new Promise((resolve, reject) => {
		db.collection(COLLECTION).insertOne({value: value}, function(err, res) {
		    if (err) {
			reject(err);
		    } else {
			resolve(value);
		    }
		});
	    });
	})
	.catch((err) => {
	    console.error("Could not read or create document: ${err}");
	    throw err;
	});
}

function update (current_value) {
    return new Promise((resolve, reject) => {
	let new_value = ++current_value;
	db.collection(COLLECTION).updateOne({}, {$set: {value: new_value}}, function(err, res) {
	    if (err) {
		throw err;
	    } else {
		resolve(new_value);
	    }
	})
    })
	.catch((err) => {
	    console.error(`Could not update the current value: ${err}`);
	    throw err;
	});
}

function print_message (current_value) {
    console.log(`[${current_value}] Hello from docker!`);
}

function disconnect () {
    if (connection) {
	connection.close();
    }
}

connect()
    .then(read_or_create)
    .then(update)
    .then(print_message)
    .then(disconnect)
    .catch((err) => {
	disconnect();
	console.error(err);
    });
