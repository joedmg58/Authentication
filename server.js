//NPM Packages
var express = require('express');
var bodyPArser = require('body-parser');
var passport = require('./helpers/passport');
var session = require('express-session');
var secret = require('./config/keys');
const db = require('./models');


//Config
var PORT = process.env.port || 8080;
var mode = process.env.NODE_ENV;
var app = express();

//Middleware
app.use(bodyPArser.urlencoded({extended: true}));
app.use(bodyPArser.json());
app.use(express.static('public'));

//Passport and session
// Auth & Session Initialization
app.use(session({ secret: secret.key, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


//Routes
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function(){
        if(mode !== 'production'){
            var opn = require('opn');
            opn(`http://localhost:${PORT}`, {APP: ['google chrome']});
        }
        console.log(`listening on port ${PORT}`);
    });
});