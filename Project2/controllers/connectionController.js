const model = require('../models/connection');


exports.connections = (req, res) =>{
    // res.send('send all connections');
    let connections = model.find();
    res.render('./connection/connections', {connections});
};


exports.newConnection =  (req, res) => {
    // res.send('send the new form');
    res.render('./connection/newConnection');
};


exports.create = (req, res) => {
    // res.send('Created a new connection');
    // console.log(req.body);
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections');
};

exports.connection = (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    let connection = model.findById(id);
    if(connection) {
        res.render('./connection/connection', {connection});    
    } else{
        // res.status(404).send('Cannot find connection with id ' + id);
        let err = new Error('Cannot find connection with id ' + id);
        err.status = 404;
        next(err);
    }
    
    // res.send(connection);
    // res.send('send connection with id ' + req.params.id);
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection) {
        console.log(connection);
        res.render('./connection/edit', {connection});    
    } else{
        let err = new Error('Cannot find connection with id ' + id);
        err.status = 404;
        next(err);
    }
    // res.send('send the edit form');
};

exports.update = (req, res, next) => {
    // res.send('update connection with id' + req.params.id);
    let connection = req.body;
    let id = req.params.id;

    if (model.updateById(id, connection)) {
        res.redirect('/connections/'+ id);
    } else {
        let err = new Error('Cannot find connection with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    // res.send('delete connection with id' + req.params.id);
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/connections');
    } else {
        let err = new Error('Cannot find connection with id ' + id);
        err.status = 404;
        next(err);
    }
};

