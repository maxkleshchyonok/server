var express = require('express');
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = [
    {
        id: 1,
        name: 'max'
    },
    {
        id: 2,
        name: 'max'
    },
    {
        id: 3,
        name: 'max'
    }
]

app.get('/', function (req, res) {
    res.send('hello api')
})

app.get('/users', function (req, res) {
    db.collection('users').find().toArray(function (err, docs) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(docs)
    })
})

app.get('/users/:id', function (req, res) {
    db.collection("users").findOne({ _id: ObjectID(req.params.id) }, function (err, doc) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(doc)
    })
})

app.post('/users', function (req, res) {
    var user = {
        name: req.body.name
    }
    db.collection('users').insert(user, function (err, result) {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(user)
    })
})

app.put('/users/:id', function (req, res) {
    db.collection('users').updateOne(
        { _id: ObjectID(req.params.id) },
        { $set: { name: req.body.name } },
        function (err, result) {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        }
    )

})

app.delete('/users/:id', function (req, res) {
    db.collection('users').deleteOne(
        { _id: ObjectID(req.params.id) },
        function (err, result) {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        }
    )

})



MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, function (err, client) {

    if (err) {
        return console.log(err);
    }
    db = client.db('users');

    app.listen(3012, function () {
        console.log("API app started");
    });

})