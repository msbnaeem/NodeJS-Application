const express = require('express');
const controller = require('../controllers/connectionController');
const {isLoggedIn, isHost} = require('../middlewares/auth');
const {validateId, validateConnection, validateResult, validateRSVP} = require('../middlewares/validator');


const router = express.Router();

// GET /connections/: sends all connections to user
router.get('/', controller.connections); 

// GET /connections/newConnection: send html form for creating a new connection
router.get('/newConnection', isLoggedIn, controller.newConnection) ;
    // res.send('NewConnection');

// POST /connections/: create a new connection
router.post('/', isLoggedIn, /*validateConnection, validateResult,*/ controller.create);

// GET /connections/:id: send details identified by the id
router.get('/:id', validateId, controller.connection);

// GET /connections/:id/edit: send html form for editing an existing connection
router.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

// PUT /connections/:id: update the connection identified by the id
router.put('/:id', validateId, isLoggedIn, isHost , /*validateConnection, validateRSVP,*/ validateResult, controller.update);

// DELETE /connections/:id: delete the connection identified by the id
router.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);

//  exporting
module.exports =  router;