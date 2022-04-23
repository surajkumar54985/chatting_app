const express = require('express');




const cookieParser = require('cookie-parser');

const app = express();
const partials = require('express-partials');

const port = 8000;

const expressLayouts = require('express-ejs-layouts');




const db = require('./config/mongoose');

const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport-local-strategy');

const passportJWT = require('./config/passport-jwt-strategy');

const MongoStore = require('connect-mongodb-session')(session);

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');

const customMware = require('./config/middleware');

app.use(partials());

app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: 'true',
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static('./assets'));

//make the uploads path avaliable to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
// app.set('layouts extractStyles', true);
// app.set('layouts extractScripts', true);




//set up view engine

app.set('view engine' , 'ejs');

app.set('views', './views');

//mongo store is used to store the session cookie in the db.

app.use(session({
    name: 'codial',
    //TODO change the seceret beafore deployment n production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:
    {
        maxAge: (1000 * 60 * 100)
    },
    store:new MongoStore({
            uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
            collection: 'mySessions'
        },
        function(err){ 
            console.log(err || 'connect-mongo setup ok');
        }
    )
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

//use express router
app.use('/' , require('./routes'));



app.listen(port , function(err){
    if(err){
        //console.log('Error:' , err);
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is up and running on port: ${port}`);
});