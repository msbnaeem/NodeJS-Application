// importing express lib
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const connectionRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
/**
 * MVC
 * Models represents your data i.e. work with your data by fetching adn saving data and much more
 * VIEWS IS WHAT USERS SEE
 * Controllers connects your models and views
 * Routes defines upon which path and which http and which controller code should execute, then controller defines which view to render
 * Controllers are also split across the middleware functions
 */

// creating app with express
const app = express();

// Configure App
let port = 2000;
let host = 'localhost';
let url = 'mongodb://127.0.0.1:27017/NBAD';
// sets view engine to ejs
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(url)
.then(() => {
    // listening to app at that port
    app.listen(port, host, () => {
    console.log('Server is running on port ', 2000);
});
})
.catch(err => console.log(err.message));

//  reading static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//   middlewares
// app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'asdfasdifusadbfasidufasdfsadif',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl: url})
}));

app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use('/users', userRoutes);
app.use('/', mainRoutes);

// all reqs with connections prefix, will be handled by connectionRoutes
app.use('/connections', connectionRoutes);

// route to homepage
// app.get('/', (req, res) => {
    // res.statusCode = 200;
    
    // res.sendFile('./views/index.ejs', {root: __dirname});
    // res.send('index');

//     res.render('index');
// });



// gets the sign up form
// app.get('/new', (req, res) => {
//     res.render('new');
// });


// create a new user
// app.post('/', (req, res, next) => {
//     // new User obj made based on the req body info
//     let user = new User(req.body);
//     user.save()
//     .then(() => res.redirect('/login'))
//     .catch(err => next(err));
// });

// get login form
// app.get('/login', (req, res) => {
//     res.render('login');
// });

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



