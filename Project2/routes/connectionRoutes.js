const express = require('express');
const controller = require('../controllers/connectionController');
const router = express.Router();

// GET /connections: sends all connections to user
router.get('/', controller.connections) 
    // res.send('All connections');


// router.get('/', controller.index);

// GET /connections/newConnection: send html form for creating a new connection
router.get('/newConnection', controller.newConnection) 
    // res.send('NewConnection');

// POST /connections: create a new connection
router.post('/', controller.create);

// GET /connections/:id: send details identified by the id
router.get('/:id', controller.connection);

// UPDATE
// GET /connections/:id/edit: send html form for editing an existing connection
router.get('/:id/edit', controller.edit);

// POST
// PUT /connections/:id: update the connection identified by the id
router.put('/:id', controller.update);

// DELETE /connections/:id: delete the connection identified by the id
router.delete('/:id', controller.delete);


//  exporting
module.exports =  router;