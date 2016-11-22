//imports
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';

import config from './config/config';
import passportConfig from './config/passport';

import eventsGetRouter from './src/api/event/routes/get_events';
import eventsPostRouter from './src/api/event/routes/post_events';
import userPostRouter from './src/api/profile/routes/post_user';
import validateUserRouter from './src/api/profile/routes/get_validate_user';

const app = express();
const port = process.env.PORT || 1337;

mongoose.Promise = Promise;
app.use(bodyParser.urlencoded({extended: true}));

// required for passport
app.use(session({ 
        secret: 'js4life',
        resave: false,
        saveUninitialized: false
    })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes
app.use('/api/events', eventsGetRouter);
app.use('/api/events', eventsPostRouter);
app.use('/api/user', userPostRouter);
app.use('/api/validateUser', validateUserRouter);

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