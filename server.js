//imports
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';

import config from './config/config';
import passportConfig from './config/passport';
import bootstrapping from './config/bootstrapping'

import routes from './config/routes';

const app = express();
const port = process.env.PORT || 1337;

mongoose.Promise = Promise;
app.use(bodyParser.urlencoded({extended: true}));

// required for passport
// session secret
app.use(session({ 
        secret: 'js4life',
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//to be removed
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//routes
app.use(routes);

//kickstart server
app.listen(port, () => {

    mongoose.connect(config.db, config.dbOptions, (err) =>{
        if(err){
            console.log(err);
        }
        console.log(`Magic is happening on http://localhost:${port}`);
    });
})

export default app;