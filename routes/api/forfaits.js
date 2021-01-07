var express = require('express');
var router = express.Router();
var config = require('../../config');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = config.database.uri;
const DB_NAME = 'forfaitsvoyages';
const COLLECTION_NAME = 'forfaits';
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, client) {
        assert.strictEqual(null, err);
        console.log("Connexion au serveur réussie");
        const db = client.db(DB_NAME);

        db.collection(COLLECTION_NAME).find().toArray(function(err, result) {
            if (err) return console.log(err)
            console.log(result);
            res.json(result);
        })
        
        client.close();
    });
});

router.get('/:id', function(req, res, next){
    MongoClient.connect(url, function(err, client) {
        assert.strictEqual(null, err);
        console.log("Connexion au serveur réussie");
        const db = client.db(DB_NAME);
        db.collection(COLLECTION_NAME).findOne({_id: ObjectId.createFromHexString(req.params.id)}, function(err, result) {
            if (err) return console.log(err)
            console.log(result);
            res.json(result);
        })

        client.close();
    });
});

router.post('/', function(req, res, next){
    var object = req.body;
    console.log(produit);
    // todo validations
    /*if(!object.nom || (!(object.prix))) {
        res.status(400);
        res.json({"erreur" : "Données incorrectes."});
    } else {*/
        MongoClient.connect(url, function(err, client) {
            assert.strictEqual(null, err);
            console.log("Connexion au serveur réussie");
            const db = client.db(DB_NAME);
            db.collection(COLLECTION_NAME).insertOne(object, function(err, result) {
                if (err) return console.log(err)
                console.log("Objet ajouté");
                res.json(result);
            })
            client.close();
        });
    //}
});

router.delete('/:id', function(req, res, next){
    MongoClient.connect(url, function(err, client) {
        assert.strictEqual(null, err);
        console.log("Connexion au serveur réussie");
        const db = client.db(DB_NAME);
        db.collection(COLLECTION_NAME).deleteOne({_id: ObjectId.createFromHexString(req.params.id)},
            function(err, result) {
                if (err) return console.log(err)
                console.log("Objet supprimé");
                res.json(result);
            })

        client.close();
    });
});

router.put('/:id', function(req, res, next){
    var objet = req.body;
    // todo : validations
    /*if(!produit.nom || (!(produit.prix))) {
        res.status(400);
        res.json({"erreur" : "Données incorrectes"});
    } else {*/
        MongoClient.connect(url, function(err, client) {
            assert.strictEqual(null, err);
            console.log("Connexion au serveur réussie");
            const db = client.db(DB_NAME);
            db.collection(COLLECTION_NAME).updateOne({_id: ObjectId.createFromHexString(req.params.id)}, {$set : objet},
                function(err, result) {
                    if (err) return console.log(err)
                    console.log("Objet mis à jour");
                    res.json(result);
                })

            client.close();
        });
    //}
});

module.exports = router;