//imports
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';

import config from './config/config';
import passportConfig from './config/passport';

import getEventsRouter from './src/api/event/routes/get_events';
import postEventsrouter from './src/api/event/routes/post_events';
import postUser from './src/api/profile/routes/post_user';
import getValidateUser from './src/api/profile/routes/get_validate_user';

const app = express();
const port = process.env.PORT || 1337;

mongoose.Promise = Promise;
app.use(bodyParser.urlencoded({extended:true}));


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
app.use('/api/events', getEventsRouter);
app.use('/api/events', postEventsrouter);
app.use('/api/user', postUser);
app.use('/api/validateUser', getValidateUser);

//kickstart server
app.listen(port, () =>{

    mongoose.connect(config.db, config.dbOptions, (err) =>{
        if(err){
            console.log(err);
        }
        console.log(`Magic is happening on http://localhost:${port}`);
    });
})

export default app;