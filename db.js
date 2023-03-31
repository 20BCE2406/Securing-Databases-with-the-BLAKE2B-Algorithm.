const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbname = "clusterdb";
const url ="mongodb+srv://nishunishanth82:Abcdef10@cluster0.5qu45g7.mongodb.net/?retryWrites=true&w=majority"
const mongoOptions = { useNewUrlParser: true };

const state = { db: null };

const connect = (cb) => {
    if (state.db)
        cb();
    else {
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if (err) cb(err);
            else {
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDB = () => {
    return state.db;
}

module.exports = { getDB, connect, getPrimaryKey };