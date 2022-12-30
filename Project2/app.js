// importing express lib
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectionRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');


// creating app with express
const app = express();
let port = 4000;
let host = 'localhost';
app.set('view engine', 'ejs');


//  reading static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//   middlewares
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use('/', mainRoutes);

// route to homepage
app.get('/', (req, res) => {
    // res.statusCode = 200;
    
    // res.sendFile('./views/index.ejs', {root: __dirname});
    // res.send('index');

    res.render('index');
});


// all reqs with connections prefix, will be handled by connectionRoutes
app.use('/connections', connectionRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    console.log(err.stack);

    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    
    res.status(err.status);
    res.render("error", {error: err});
    
});

// listening to app at that port
app.listen(port, host, () => {
    console.log('Serving is running on port ', port);
});

