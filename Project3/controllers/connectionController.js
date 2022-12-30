const model = require('../models/connection');
const { DateTime } = require("luxon");

exports.connections = (req, res, next) =>{
    // res.send('send all connections');
    model.find()
    .then(connections => res.render('./connection/connections', {connections}))
    .catch(err => next(err));
};


exports.newConnection =  (req, res) => {
    // res.send('send the new form');
    res.render('./connection/newConnection');
};


exports.create = (req, res, next) => {
    // res.send('Created a new connection');
    // console.log(req.body);
    let connection = new model(req.body); // create a new connection document
    connection.save() // insert a new document to the db
    .then((connection) => {
        console.log(connection);
        res.redirect('/connections');
    })
    .catch(err => {
        if(err.name === 'ValidationError' ){
            err.status = 400;
        } 
        next(err);        
    });
};

exports.connection = (req, res, next) => {
    let id = req.params.id;
    // console.log(id);
    // an obj id is a 24-bit Hes String
    if (!id.match(/^[0-9a-f-A-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(connection => {
        if (connection) {
            console.log(connection);
            // add luxon date formation
            res.render('./connection/connection', {connection});    
        } else {
            // res.status(404).send('Cannot find connection with id ' + id);
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
    // res.send(connection);
    // res.send('send connection with id ' + req.params.id);
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    
    if (!id.match(/^[0-9a-f-A-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(connection => {
        if (connection) {
            console.log(connection);
            return res.render('./connection/edit', {connection});    
        } else {
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.update = (req, res, next) => {
    // res.send('update connection with id' + req.params.id);
    let connection = req.body;
    let id = req.params.id;

    if (!id.match(/^[0-9a-f-A-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then( connection => {
        if (connection) {
            res.redirect('/connections/'+ id);
        } else {
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        next(err)
        }
    });
};

exports.delete = (req, res, next) => {
    // res.send('delete connection with id' + req.params.id);
    let id = req.params.id;
    if (!id.match(/^[0-9a-f-A-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then( result => {
        if (result) {
            res.redirect('/connections');
        } else {
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

